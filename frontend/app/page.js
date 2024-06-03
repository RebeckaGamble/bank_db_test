import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="w-full h-auto">
      <Hero />
      <div className="w-full">
        <div className="w-full py-10 lg:py-20 bg-white dark:bg-[#414142] dark:text-white">
          <div className="max-w-[90rem] mx-auto px-4 w-[90rem]:px-0 ">
            <div className="max-w-[800px] mx-auto">
              <h3 className="pb-4 font-semibold text-[20px] ">
                Lorem ipsum dolor sit.
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                nesciunt quas qui iusto quae excepturi voluptate, cumque
                molestias earum ipsum.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequatur nisi magnam doloremque eius ipsum. Fugiat libero,
                provident nisi enim molestiae eveniet dolore autem veritatis
                temporibus. Dignissimos placeat facere minus ab sed soluta,
                consequuntur, quibusdam, exercitationem error sit officia quas
                accusantium.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full py-10 lg:py-20 bg-slate-50 dark:bg-[#121212]">
          <div className="px-4 flex justify-center flex-col md:flex-row gap-6">
            <div>
              <h4 className="pb-4 font-semibold text-[20px]">Lorem, ipsum.</h4>
              <p className="max-w-[600px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Delectus adipisci ad perspiciatis eligendi magni quia.
                Voluptates dolore obcaecati esse fugit.
              </p>
            </div>
            <div>
              <h4 className="pb-4 font-semibold text-[20px]">Lorem, ipsum.</h4>
              <p className="max-w-[600px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Delectus adipisci ad perspiciatis eligendi magni quia.
                Voluptates dolore obcaecati esse fugit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
