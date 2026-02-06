export type Form = {
  _type: "form";
  title?: string;
  heading?: string;
  subheading?: string;
  text1?: string;
  text?: string;
  items?: Array<{
    type?: "email" | "message" | "phone" | "text";
    title?: string;
    placeholder?: string;
    _type: "formItems";
    _key: string;
  }>;
};

type FormProps = {
  block: Form;
  index: number;
};

export default function Form({ block }: FormProps) {
  if (!block) return null;

  return (
    
    <main className="section w-full">
      <div className="flex-col md:grid md:grid-cols-2 md:gap-8 mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10">
        <div className="mb-14">
          {block.heading && (
          <h5 className="text-primary text-sm reveal uppercase mb-4 font-medium lg:text-1xl">{block.heading}</h5>
          )}
          {block.subheading && (
          <h1 className="font-display text-primary max-w-3xl text-balance font-display text-5xl md:text-6xl lg:text-7xl mt-4 mb-4 reveal uppercase">{block.subheading}</h1>
          )}
          {block.text1 && (
          <p className="max-w-sm mb-2 md:text-1xl lg:text-2xl">{block.text1}</p>
          )}
          {block.email && (
          <a href="mailto:{block.email}" className="text-primary md:text-1xl lg:text-3xl">{block.email}</a>
          )}
        </div>

        <div >

          {block.text && (
            <div className="md:text-1xl lg:text-2xl">{block.text}</div>
          )}

          {block.items && block.items.length > 0 && (
            <div className="mt-16 space-y-6 md:mt-16 md:space-y-8">
              {block.items.map((item) => {
                return (
                  <div key={item._key} className="flex flex-col gap-2">
                    {item.title && (
                      <div className="md:text-1xl lg:text-2xl font-medium uppercase">
                        {item.title}
                      </div>
                    )}

                    {item.placeholder && item.type != "message" && (

                      <input
                        type={item.type || "text"}
                        placeholder={item.placeholder}
                        className="md:text-1xl lg:text-2xl bg-transparent border-b"
                      />
                    )}

                    {item.placeholder && item.type == "message" && (
                      <textarea
                        placeholder={item.placeholder}
                        className="md:text-1xl lg:text-2xl bg-transparent border-b"
                      />
                    )}

                  </div>
                );
              })}
              <div className="flex justify-end">
                <button type="submit" className="send-btn text-primary mb-14 p-2 w-72 hover:bg-primary hover:text-white">SEND <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 5.31836L12.8681 10.3184M17 5.31836L12.8681 0.318359M17 5.31836L2.5828e-07 5.31836" stroke="#060F9F"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
