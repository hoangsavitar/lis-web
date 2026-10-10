import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { HOME_CAMPAIGN } from "@/data/home-campaign";
import { SITE } from "@/data/site";

export function CampaignHero() {
  return (
    <section className="campaign-hero" aria-labelledby="campaign-title" id="mia-bag-feature">
      <div className="campaign-media">
        <div className="campaign-photo">
          <Image src={HOME_CAMPAIGN.image.src} alt={HOME_CAMPAIGN.image.alt} fill priority sizes="(max-width: 767px) 1081px, 100vw" quality={85} />
        </div>
      </div>
      <div className="campaign-inner">
        <div className="campaign-copy">
          <h1 id="campaign-title"><span>{HOME_CAMPAIGN.title}</span><span className="campaign-date">Quà tặng {HOME_CAMPAIGN.date}</span></h1>
          <div className="campaign-actions">
            <Link className="button" href={HOME_CAMPAIGN.action.href}>{HOME_CAMPAIGN.action.label}<ArrowRight size={20} aria-hidden="true" /></Link>
            <a className="campaign-contact" href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Nhắn LIS trên Facebook (mở tab mới)">Nhắn LIS<ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
