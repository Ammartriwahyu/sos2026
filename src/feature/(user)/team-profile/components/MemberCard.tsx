"use client";

import React from "react";
import Image from "next/image";
import LogoSos from "@/assets/assetsos26/logo-sos26.svg";
import { useCardTilt } from "../hooks/useCardTilt";
import type { TeamMember } from "../types";

interface MemberCardProps {
  member: TeamMember;
  divisionLabel: string;
}

const CARD_SIZES = "(min-width: 768px) 440px, 70vw";

const MemberCard = ({ member, divisionLabel }: MemberCardProps) => {
  const cardRef = useCardTilt<HTMLElement>();

  return (
    <div className="tp-card-slot">
      <article
        ref={cardRef}
        tabIndex={0}
        className="tp-card aspect-[3/4] w-full"
      >
        <Image
          src={member.photo}
          alt={`Foto ${member.fullName}`}
          fill
          sizes={CARD_SIZES}
          className="tp-card-photo object-cover object-bottom"
        />
        <div className="tp-card-shade" aria-hidden />
        <div className="tp-card-caption absolute inset-x-0 bottom-0 z-[3] flex flex-col items-start gap-2 p-[7%]">
          <h3 className="font-poppins text-xl font-semibold leading-tight text-putih md:text-2xl">
            {member.name}
          </h3>
          <span className="tp-card-badge rounded-full px-2.5 py-1 font-poppins text-xs font-medium leading-none">
            {divisionLabel}
          </span>
        </div>
      </article>
      <div className="tp-card-back" aria-hidden>
        <Image src={LogoSos} alt="" className="h-1/3 w-1/3" />
      </div>
    </div>
  );
};

export default MemberCard;
