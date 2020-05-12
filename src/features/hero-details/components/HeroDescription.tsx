import React from "react";
import Separator from "./Separator";

interface IHeroDescriptionProps {
  description: string | undefined;
}

const HeroDescription = ({ description }: IHeroDescriptionProps) => {
  if (description) {
    return (
      <>
        <Separator />
        <span style={{ fontWeight: 600 }}>{description}</span>
      </>
    );
  }
  return null;
};

export default HeroDescription;
