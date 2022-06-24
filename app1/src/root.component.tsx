declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-carousel': { 
        'autoplay-delay': number, 
        autoplay: boolean,
        children: any[],
      };
    }
  }
}

export default function Root(props) {
  return <section>
    <my-carousel
      autoplay-delay={3000}
      autoplay
    >
      <img
        src="https://assets.zenvia.com/images/home/Banner-Zenvia-CI_PT.png"
        alt=""
      />

      <img
        src="https://zenvia-static.s3.amazonaws.com/zenvia_banner_v2.png"
        alt=""
      />
    </my-carousel>
  </section>;
}
