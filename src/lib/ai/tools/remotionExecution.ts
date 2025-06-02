// src/tools/remotionExecution.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { RemotionAgentConfig } from '../types';

const execAsync = promisify(exec);

interface ValidationResult {
  success: boolean;
  logOutput: string; // Combined stdout and stderr
  error?: string;
}

// Helper to ensure paths are safe for shell commands
function escapeShellArg(arg: string): string {
  // Basic escaping, consider more robust library if complex paths are common
  return `'${arg.replace(/'/g, "'\\''")}'`;
}


export async function validateRemotionCode(
  tsxCode: string,
  compositionId: string,
  config: Required<RemotionAgentConfig>['codeValidation'],
  sessionId: string
): Promise<ValidationResult> {
  const projectDir = path.resolve(config.tempDir ?? './remotion_agent_temp', `session_${sessionId}`);
  const srcDir = path.join(projectDir, 'src');
  const videoFilePath = path.join(srcDir, config.videoFileName ?? 'MainComposition.tsx');
  const outDir = path.join(projectDir, 'out');
  const outputFile = path.join(outDir, `validation_still.png`);

  let logOutput = "";

  try {
    logOutput += `Setting up temporary Remotion project in: ${projectDir}\n`;
    await fs.rm(projectDir, { recursive: true, force: true }); // Clean previous session
    await fs.mkdir(srcDir, { recursive: true });
    await fs.mkdir(outDir, { recursive: true });

    // 1. Create package.json
    const packageJsonContent = {
      name: `remotion-agent-validation-${sessionId}`,
      version: "1.0.0",
      private: true,
      scripts: {
        build: "remotion render", // Not used for validation directly but good to have
        still: "remotion still"
      },
      dependencies: {
        "@remotion/cli": "^4.0.0", // Use a specific version aligned with your environment
        "react": "^18.2.0",
        "remotion": "^4.0.0"
      },
      devDependencies: {
        "@types/react": "^18.2.0",
        "typescript": "^5.0.0"
      }
    };
    await fs.writeFile(path.join(projectDir, 'package.json'), JSON.stringify(packageJsonContent, null, 2));

    // 2. Create tsconfig.json
    const tsconfigJsonContent = {
      compilerOptions: {
        target: "es2022",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true, // Important: we only care about type checking and remotion render/still
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler", // or "node"
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        incremental: true,
      },
      include: ["src/**/*.ts", "src/**/*.tsx", "remotion.config.ts"],
      exclude: ["node_modules"]
    };
    await fs.writeFile(path.join(projectDir, 'tsconfig.json'), JSON.stringify(tsconfigJsonContent, null, 2));

    // 3. Write the generated TSX code
    await fs.writeFile(videoFilePath, tsxCode);
    logOutput += `TSX code written to ${videoFilePath}\n`;

    // 4. Install dependencies
    logOutput += `Installing npm dependencies...\n`;
    const npmInstallCommand = `npm install --prefix ${escapeShellArg(projectDir)}`;
    try {
        const { stdout: npmStdout, stderr: npmStderr } = await execAsync(npmInstallCommand, { timeout: config.npmInstallTimeout });
        logOutput += `NPM Install STDOUT:\n${npmStdout}\n`;
        if (npmStderr) logOutput += `NPM Install STDERR:\n${npmStderr}\n`;
    } catch (npmError: any) {
        logOutput += `NPM Install Failed:\nSTDOUT: ${npmError.stdout}\nSTDERR: ${npmError.stderr}\n`;
        return { success: false, logOutput, error: `npm install failed: ${npmError.stderr || npmError.message}` };
    }
    logOutput += `NPM dependencies installed.\n`;
    
    // 5. Attempt to render a still frame using Remotion CLI
    // The entry point for `remotion still` is the relative path to the component file from project root
    const remotionEntryPoint = path.relative(projectDir, videoFilePath);
    const remotionCommand = `npx remotion still ${escapeShellArg(remotionEntryPoint)} ${escapeShellArg(compositionId)} ${escapeShellArg(outputFile)} --log-level=${config.remotionLogLevel} --frame=0`;
    
    logOutput += `Executing Remotion: ${remotionCommand}\n`;

    try {
      const { stdout, stderr } = await execAsync(remotionCommand, { cwd: projectDir, timeout: config.remotionRenderTimeout });
      logOutput += `Remotion STDOUT:\n${stdout}\n`;
      if (stderr) {
        logOutput += `Remotion STDERR:\n${stderr}\n`;
        // Remotion often outputs non-fatal warnings to stderr. Success is determined by exit code and file presence.
      }

      // Check if output file was created
      try {
        await fs.access(outputFile);
        logOutput += `Validation successful: Still frame rendered to ${outputFile}\n`;
        return { success: true, logOutput };
      } catch (fileError) {
        logOutput += `Output file ${outputFile} not found after Remotion command.\n`;
        return { success: false, logOutput, error: `Remotion command seemed to succeed but output file was not found. STDERR: ${stderr}` };
      }

    } catch (error: any) {
      logOutput += `Remotion CLI execution failed.\nSTDOUT: ${error.stdout}\nSTDERR: ${error.stderr}\nError Object: ${error.message}\n`;
      return { success: false, logOutput, error: `Remotion CLI failed: ${error.stderr || error.stdout || error.message}` };
    }

  } catch (e: any) {
    logOutput += `Unexpected error during validation setup: ${e.message}\n${e.stack}\n`;
    return { success: false, logOutput, error: `Validation process error: ${e.message}` };
  } finally {
    if (config.cleanupAfterTest && projectDir) {
      try {
        await fs.rm(projectDir, { recursive: true, force: true });
        logOutput += `Cleaned up temporary directory: ${projectDir}\n`;
      } catch (cleanupError: any) {
        logOutput += `Failed to cleanup temporary directory ${projectDir}: ${cleanupError.message}\n`;
        console.warn(`Failed to cleanup temporary directory ${projectDir}: ${cleanupError.message}`);
      }
    }
    // For debugging, you might want to inspect the temp folder
    // else {
    //   console.log(`Temporary directory kept for inspection: ${projectDir}`);
    // }
  }
}