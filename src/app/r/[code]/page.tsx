import type { Metadata } from "next";
import { SlimFooter } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Nav } from "@/components/layout/Nav";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { SignupForm } from "@/components/SignupForm";
import { Accent, Eyebrow, Glow, Sticker } from "@/components/ui/bits";
import { ButtonLink } from "@/components/ui/Button";
import { Ticket } from "@/components/ui/Ticket";
import { cn, formatNumber } from "@/lib/cn";
import { SAMPLE_INVITERS } from "@/lib/sample-data";
import { SPOTS_PER_INVITE } from "@/lib/site";

type Props = { params: Promise<{ code: string }> };

// TODO(backend): replace with a lookup of the referral code.
function getInviter(code: string) {
  return SAMPLE_INVITERS[code.toLowerCase()] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const inv = getInviter(code);
  const who = inv?.first ?? "A friend";
  return {
    title: `${who} saved you a spot`,
    description: `Join Sanji through ${inv ? `${inv.first}'s` : "this"} invite and you both move up ${SPOTS_PER_INVITE} spots.`,
  };
}

export default async function InvitePage({ params }: Props) {
  const { code } = await params;
  const inv = getInviter(code);
  const first = inv?.first ?? "A friend";
  const possessive = inv ? `${inv.first}'s` : "your friend's";

  return (
    <>
      <AnnouncementBar href="#accept">
        You were invited — join through this link and you both move up {SPOTS_PER_INVITE} spots
      </AnnouncementBar>
      <Nav right={<ButtonLink href="#accept" arrow className="h-10 px-4 text-sm md:h-12 md:px-6 md:text-[15px]">Accept invite</ButtonLink>} />
      <main>
        <section className="relative overflow-hidden pt-10 pb-20 md:pt-20 md:pb-[120px]">
          <Glow className="-top-32 -left-52 size-[620px] bg-coral/35" />
          <Glow className="top-32 -right-40 size-[700px] bg-violet/40" />
          <div className="relative container-x grid items-center gap-14 lg:grid-cols-[1fr_500px] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface py-1.5 pr-4 pl-1.5 text-sm font-medium md:text-[15px]">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-coral to-pink font-display text-[13px] font-bold text-ink">
                  {inv?.initials ?? "★"}
                </span>
                {inv ? `${inv.name} · ${inv.craft}, ${inv.city} · invited you` : "You were invited to Sanji"}
              </p>
              <h1 className="display mt-8 text-[clamp(60px,9vw,112px)]">
                {first} saved
                <br />
                you a spot
                <br />
                in <Accent className="text-lime">line.</Accent>
              </h1>
              <p className="mt-7 max-w-[560px] text-base leading-relaxed text-muted md:text-xl">
                Sanji is the art platform with no algorithm, one home for every kind of artist. Join through {possessive} invite and you
                both jump {SPOTS_PER_INVITE} spots closer to the front.
              </p>
              <div id="accept" className="scroll-mt-32">
                <SignupForm refCode={code} ctaLabel="Accept invite" className="mt-9" glow />
              </div>
              <p className="mt-4 flex items-center gap-2.5 font-mono text-xs text-muted">
                <span className="rounded-full bg-lime px-2.5 py-1 font-medium text-ink">+{SPOTS_PER_INVITE}</span>
                Invite bonus applied. You start {SPOTS_PER_INVITE} spots ahead of a normal signup.
              </p>
            </div>

            <div aria-hidden className="relative mx-auto h-[520px] w-[340px] md:h-[620px] md:w-[520px]">
              <div className="absolute top-6 left-0 -rotate-[8deg]">
                <Ticket
                  tone="coral"
                  label={`${first}'s ticket`}
                  number={inv ? `#${formatNumber(inv.number)}` : "#----"}
                  sub={inv ? `${inv.name} · ${inv.craft}` : undefined}
                  trend={`▲ +${SPOTS_PER_INVITE} when you join`}
                  className="w-[250px] md:w-[320px]"
                />
              </div>
              <div className="absolute top-[200px] left-[90px] rotate-6 md:top-[240px] md:left-[220px]">
                <Ticket
                  tone="dashed"
                  label="Your ticket"
                  number="#????"
                  sub="Your number appears the second you join."
                  trend={`+${SPOTS_PER_INVITE} head start`}
                  className="w-[250px] md:w-[300px]"
                />
              </div>
              <Sticker tone="sky" className="absolute bottom-0 left-4 -rotate-6 md:left-10">
                You both move up ↑
              </Sticker>
            </div>
          </div>
        </section>

        <section className="container-x grid gap-4 pb-20 md:grid-cols-3 md:gap-5 md:pb-[120px]">
          {[
            { k: "For you", big: `+${SPOTS_PER_INVITE}`, body: `You skip ${SPOTS_PER_INVITE} people the moment you sign up.`, cls: "bg-lime text-ink" },
            { k: `For ${first}`, big: `+${SPOTS_PER_INVITE}`, body: `${first} moves up too. Good friends bring good friends.`, cls: "bg-gradient-to-br from-pink to-sky text-ink" },
            { k: "For everyone", big: "Zero", body: "algorithms deciding who gets seen. Just the work, sorted by craft.", cls: "border border-line bg-surface" },
          ].map((c) => (
            <div key={c.k} className={cn("rounded-[32px] p-8 md:p-10", c.cls)}>
              <p className="eyebrow opacity-75">{c.k}</p>
              <p className="mt-3 font-display text-[80px] leading-[0.9] font-extrabold tracking-[-0.06em] md:text-[96px]">{c.big}</p>
              <p className="mt-3 max-w-[320px] text-base leading-relaxed opacity-80 md:text-[17px]">{c.body}</p>
            </div>
          ))}
        </section>

        <section className="bg-surface py-20 md:py-[120px]">
          <div className="container-x flex flex-col items-center text-center">
            <Eyebrow accent="sky">What you&apos;re joining</Eyebrow>
            <h2 className="display mt-6 text-[clamp(44px,7vw,84px)]">
              A home where the
              <br />
              <Accent className="text-sky">work speaks first.</Accent>
            </h2>
            <div className="mt-12 grid w-full gap-4 text-left md:mt-14 md:grid-cols-3 md:gap-5">
              {[
                ["01", "Your work is your profile", "No bio to polish, no follower count on show. What you made is who you are.", "bg-lime"],
                ["02", "Sorted by craft, not clout", "Browse by art form, newest first. Nothing deciding who deserves to be seen.", "bg-pink"],
                ["03", "Talk directly", "Collaborators, galleries and people who hire can message you. No agent, no wall.", "bg-coral"],
              ].map(([n, t, b, c]) => (
                <div key={n} className="rounded-[28px] border border-line bg-ink p-8 md:p-9">
                  <span className={cn("inline-flex size-12 items-center justify-center rounded-full font-mono text-sm font-medium text-ink", c)}>{n}</span>
                  <h3 className="mt-5 font-display text-[28px] leading-tight font-bold tracking-tight md:text-[30px]">{t}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA
          title={
            <>
              Don&apos;t leave {first}
              <br />
              <Accent>waiting.</Accent>
            </>
          }
          body={`Join with ${possessive} link and you both move up ${SPOTS_PER_INVITE} spots today.`}
          refCode={code}
          ctaLabel="Accept invite"
        />
      </main>
      <SlimFooter />
    </>
  );
}
