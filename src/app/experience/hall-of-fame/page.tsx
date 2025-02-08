'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

const TweetEmbed = ({ id }: { id: string }) => (
  <div className="bg-black/20 rounded-xl p-4">
    <div
      dangerouslySetInnerHTML={{
        __html: `<blockquote class="twitter-tweet"><a href="https://twitter.com/x/status/${id}"></a></blockquote>`
      }}
    />
  </div>
);

const FallingCrowns = () => {
  const crowns = Array.from({ length: 20 }).map((_, i) => {
    const delay = Math.random() * 20;
    const duration = 15 + Math.random() * 10;
    const size = 24 + Math.random() * 24;
    const left = Math.random() * 100;
    const opacity = 0.3 + Math.random() * 0.3;

    return (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${left}%`,
          animation: `fall ${duration}s linear ${delay}s infinite`,
          width: size,
          height: size,
          opacity,
        }}
      >
        <img src="/crown.svg" alt="" className="w-full h-full" />
      </div>
    );
  });

  return <div className="absolute inset-0 overflow-hidden">{crowns}</div>;
};

export default function HallOfFamePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen relative bg-black">
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>

      {/* Falling Crowns Background */}
      <FallingCrowns />

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/experience"
            className="inline-flex items-center space-x-2 text-white hover:text-[#FFB81C] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Drama Dome</span>
          </Link>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-[#FFB81C] p-8 space-y-6">
          <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg mb-2">
            Hall of Fame: 2024-25 Season
          </h1>
          <h2 className="text-2xl font-bold text-[#FFB81C] text-center italic mb-6">
            The Haters' Greatest Hits 💅
          </h2>

          {/* Week 1 */}
          <div className="space-y-4 border-b-2 border-[#FFB81C]/30 pb-6">
            <h3 className="text-xl font-bold text-[#FFB81C]">Week 1: The "Out of Bounds" Drama 🙄</h3>
            <p className="text-white mb-4">
              Omg bestie, they really tried it with Isaiah Likely's "touchdown." Like, honey... 
              if you're gonna step on the line, at least make it less obvious! And don't even get 
              me started on them crying about Spags calling a timeout. Maybe if your team had better 
              coaching... just saying! 💁‍♀️
            </p>
            <TweetEmbed id="1831903705127645310" />
          </div>

          {/* Week 2 */}
          <div className="space-y-4 border-b-2 border-[#FFB81C]/30 pb-6">
            <h3 className="text-xl font-bold text-[#FFB81C]">Week 2: The Bengals' Pass Interference Meltdown 💅</h3>
            <p className="text-white mb-4">
              Daijahn Anthony really said "early bird gets the DPI" and y'all mad about it?? 
              Like, maybe try playing the ball instead of our receivers? Just a thought! And Cam 
              Taylor-Britt saying he would've done the same thing... at least someone's honest! 😘
            </p>
            <TweetEmbed id="1835459951378248152" />
          </div>

          {/* Week 3 */}
          <div className="space-y-4 border-b-2 border-[#FFB81C]/30 pb-6">
            <h3 className="text-xl font-bold text-[#FFB81C]">Week 3: The Kyle Pitts "Controversy" 🤔</h3>
            <p className="text-white mb-4">
              Everyone watching SNF suddenly became a ref expert! Like, if you need slow-mo replay 
              to see it, maybe it's not as obvious as you think? Bryan Cook was just playing 
              aggressive defense, but I guess that's illegal when the Chiefs do it! 💅
            </p>
            <TweetEmbed id="1838051505326407760" />
          </div>

          {/* Week 9 */}
          <div className="space-y-4 border-b-2 border-[#FFB81C]/30 pb-6">
            <h3 className="text-xl font-bold text-[#FFB81C]">Week 9: The Jawaan Taylor Saga Continues 💁‍♀️</h3>
            <p className="text-white mb-4">
              Y'all really spend more time watching our tackle than your own team! Maybe if you 
              focused on winning instead of false starts, you'd make the playoffs? Just a thought! 
              And that Travis touchdown drive was *chef's kiss* 👑
            </p>
            <TweetEmbed id="1853655237669605490" />
          </div>

          {/* Week 16 */}
          <div className="space-y-4 border-b-2 border-[#FFB81C]/30 pb-6">
            <h3 className="text-xl font-bold text-[#FFB81C]">Week 16: The "Phantom" PI on Tank Dell 🎭</h3>
            <p className="text-white mb-4">
              First of all, if you have to watch something 47 times in slow motion to prove your 
              point, maybe you're reaching? And let's talk about all the holds they missed on 
              Chris Jones while we're at it! 💅
            </p>
            <TweetEmbed id="1870549720311251145" />
          </div>

          {/* Playoffs - Divisional */}
          <div className="space-y-4 border-b-2 border-[#FFB81C]/30 pb-6">
            <h3 className="text-xl font-bold text-[#FFB81C]">Divisional Round: The Roughing "Drama" 🙄</h3>
            <p className="text-white mb-4">
              Will Anderson really got fined $25k for complaining... maybe that money should go 
              towards better tackling practice? 💁‍♀️ Like, protect the QBs or whatever, but 
              don't come for my man Pat! 
            </p>
            <div className="space-y-4">
              <TweetEmbed id="1880979712643940711" />
              <TweetEmbed id="1880735734661107818" />
              <TweetEmbed id="1880759350870114478" />
            </div>
          </div>

          {/* AFC Championship */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FFB81C]">AFC Championship: The Ultimate Meltdown 👑</h3>
            <p className="text-white mb-4">
              Omg bestie, this one's my favorite! They really thought Josh made that sneak? 
              Honey, if you need CSI-level enhancement to see if you made it... you didn't make it! 
              And that catch? Clear as my ring collection! Stay mad! 💅✨
            </p>
            <div className="space-y-4">
              <TweetEmbed id="1883680434292461792" />
              <TweetEmbed id="1883699421512356149" />
              <TweetEmbed id="1883698827800240454" />
            </div>
            <p className="text-white mt-4 italic text-center">
              Stay mad besties, we'll keep winning! And remember, if you're reading this... 
              you're probably just jealous! 💋
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
