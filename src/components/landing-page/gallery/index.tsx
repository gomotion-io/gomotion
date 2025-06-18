"use client";

import React from "react";
import { VideoItem } from "./video-item";
import "./style.css";

export const Gallery = () => {
  return (
    <div className="work-page mb-44">
      <div className="">
        <div className="works">
          <div className="row">
            <VideoItem
              videoId={437808118}
              index="01"
              workName="Azure Serenity Echoes"
            />
            <VideoItem
              videoId={871750630}
              index="02"
              workName="Solar Reverie"
            />
            <VideoItem
              videoId={477068055}
              index="03"
              workName="Crimson Symphony Memoirs"
            />
          </div>
          <div className="row">
            <VideoItem
              videoId={487114118}
              index="04"
              workName="Neon Galactic Chronicles"
            />
            <VideoItem
              videoId={366780994}
              index="05"
              workName="Velvet Dreamscape"
            />
            <VideoItem
              videoId={659334960}
              index="06"
              workName="Lunar Symphony"
            />
          </div>
          <div className="row">
            <VideoItem
              videoId={533729157}
              index="07"
              workName="Oceanic Memoirs Echoes"
            />
            <VideoItem
              videoId={500832353}
              index="08"
              workName="Twilight Dreamscape Saga"
            />
            <VideoItem
              videoId={510814675}
              index="09"
              workName="Galactic Odyssey"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
