import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
        The Boundless Domain
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
        Step into a limitless universe, where a dynamic fusion of worlds unfolds. Experience a seamless, ever-expanding realm where reality and innovation converge into a breathtaking cinematic overlay
        </p>
      </div>

      {/* <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              Ge<b>nr</b>e
            </>
          }
          description="Experience all kind of movie genres in a cinematic way"
          isComingSoon
        />
      </BentoTilt> */}
     <BentoTilt
  className="relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
  style={{ border: "1px solid hsla(0, 0%, 0%, 0.1)" }}
>
  <div
    className="banner"
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      className="slider"
      style={{
        position: "absolute",
        width: "200px",
        height: "250px",
        top: "10%",
        left: "calc(50% - 100px)",
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
        animation: "autoRun 20s linear infinite",
        zIndex: 2,
        "--quantity": 10,
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="item"
          key={index}
          style={{
            "--position": index + 1,
            position: "absolute",
            inset: "0 0 0 0",
            transform: `rotateY(calc((${index + 1} - 1) * (360 / 10) * 1deg)) translateZ(550px)`,
          }}
        >
          <video
            src={`img/dragon_${index + 1}.mp4`}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          ></video>
        </div>
      ))}
    </div>
    <div
      className="content"
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1400px, 100vw)",
        paddingBottom: "100px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <h1
        data-content="GENRES"
        style={{
          fontFamily: "'ICA Rubrik', sans-serif",
          fontSize: "16em",
          lineHeight: "1em",
          color: "#25283B",
          position: "relative",
          WebkitTextStroke: "2px #d2d2d2",
        }}
      >
        {/* GENRES */}
      </h1>
      <div
        className="author"
        style={{
          fontFamily: "'Poppins', sans-serif",
          textAlign: "right",
          maxWidth: "200px",
        }}
      >
        <h2 style={{ fontSize: "3em" }}>SPECTACLE</h2>
        <p>Experience all kinds of genres with good screenplay</p>
      </div>
      <div
        id="model-container"
        style={{
          width: "100%",
          height: "75vh",
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          background: "transparent",
        }}
      ></div>
    </div>
  </div>
</BentoTilt>


      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                ani<b>ma</b>tion
              </>
            }
            description="A new era unfolds. Where anime artistry meets gaming legend, forging a cinematic universe beyond imagination."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-31.mp4"
            title={
              <>
                f<b>ut</b>ure
              </>
            }
            description=""
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                ev<b>ol</b>ve
              </>
            }
            description="Step into the future of entertainment—Eonverse elevates your theatrical experience like never before!"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
