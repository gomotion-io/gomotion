export const Further = () => {
  return (
    <section className="w-full h-full sm:py-16 block-layout" id="works">
      <div className="flex gap-8">
        <div className="hidden sm:block sm:flex-1" />
        <div className="flex-1">
          <div className="w-full sm:w-[70%] space-y-8 sm:space-y-16">
            <h2 className="text-4xl sm:text-6xl font-neue-montreal font-semibold">
              Can machines innovate Like Human Artists ?
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Generative AI has rapidly advanced, moving beyond its humble
              beginnings of basic visual outputs to now creating stunning,
              lifelike artworks that challenge our perceptions of creativity and
              technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
