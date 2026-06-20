import React from 'react';
import { HighlightsCarousel } from './HighlightsCarousel';
import { ImageGallery } from './ImageGallery';
import { ImageTextBlock } from './ImageTextBlock';
import { LongImageWithSidebar } from './LongImageWithSidebar';
import { RoleBlock } from './RoleBlock';
import { TextBlock } from './TextBlock';
import { VideoBlock } from './VideoBlock';

export function ProjectSectionRenderer({ sections = [], onImageClick }) {
  return sections.map((section, index) => {
    const key = section.id ?? `${section.type}-${index}`;
    switch (section.type) {
      case 'text': return <TextBlock key={key} {...section} />;
      case 'imageText': return <ImageTextBlock key={key} {...section} onImageClick={onImageClick} />;
      case 'longImageSidebar': return <LongImageWithSidebar key={key} {...section} onImageClick={onImageClick} />;
      case 'carousel': return <HighlightsCarousel key={key} {...section} onImageClick={onImageClick} />;
      case 'role': return <RoleBlock key={key} {...section} />;
      case 'gallery': return <ImageGallery key={key} {...section} onImageClick={onImageClick} />;
      case 'video': return <VideoBlock key={key} {...section} />;
      default: return null;
    }
  });
}
