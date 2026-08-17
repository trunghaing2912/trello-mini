import { Link, useNavigate } from "react-router-dom";

type NotFoundProps = {
  homePath: string;
};

const orbitClasses = "absolute rounded-full border border-[rgba(99,91,255,0.18)]";
const decorativeCardClasses =
  "absolute z-[3] h-10 w-[54px] rounded-[9px] border-4 border-white shadow-[0_8px_18px_rgba(23,43,77,0.16)] after:absolute after:top-[9px] after:left-2.5 after:h-1 after:w-6 after:rounded-[3px] after:bg-[rgba(255,255,255,0.75)] after:content-['']";
const actionClasses =
  "min-w-[132px] cursor-pointer rounded-[10px] border-0 px-[18px] py-3 font-[750] no-underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(99,91,255,0.35)]";

export default function NotFound({ homePath }: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(99,91,255,0.18),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(91,187,255,0.16),transparent_24%)] bg-[#f7f8fc] px-6 py-8 max-[520px]:px-[18px] max-[520px]:py-6">
      <section className="w-full max-w-[680px] text-center" aria-labelledby="not-found-title">
        <Link className="inline-flex items-center gap-2.5 text-[#172b4d] no-underline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[rgba(99,91,255,0.35)]" to={homePath} aria-label="Trello Mini - Trang chủ">
          <span className="grid size-[38px] place-items-center rounded-[10px] bg-[#635bff] text-[19px] font-extrabold text-white shadow-[0_8px_18px_rgba(99,91,255,0.24)]" aria-hidden="true">T</span>
          <strong>Trello Mini</strong>
        </Link>

        <div className="relative mx-auto mt-[26px] mb-1 grid h-[250px] w-full max-w-[460px] place-items-center max-[520px]:h-[210px]" aria-hidden="true">
          <span className={`${orbitClasses} h-[180px] w-[390px] -rotate-[8deg] max-[520px]:h-[145px] max-[520px]:w-[300px]`} />
          <span className={`${orbitClasses} h-[225px] w-80 rotate-[14deg] max-[520px]:h-[190px] max-[520px]:w-[250px]`} />
          <span className="relative z-[2] text-[clamp(92px,20vw,150px)] leading-none font-black tracking-[-0.08em] text-[#635bff] [text-shadow:0_14px_30px_rgba(99,91,255,0.18)]">404</span>
          <span className={`${decorativeCardClasses} top-[39px] right-[42px] rotate-12 bg-[#5bbfff] max-[520px]:right-3`} />
          <span className={`${decorativeCardClasses} bottom-8 left-[38px] -rotate-[10deg] bg-[#ffab57] max-[520px]:left-3`} />
          <span className="absolute top-[55px] left-[82px] size-3 rounded-full bg-[#635bff]" />
          <span className="absolute right-[84px] bottom-[54px] size-2 rounded-full bg-[#ffab57]" />
        </div>

        <p className="mt-0 mb-[9px] text-[13px] font-extrabold tracking-[0.1em] text-[#635bff] uppercase">Trang không tồn tại</p>
        <h1 className="m-0 text-[clamp(30px,6vw,44px)] tracking-[-0.03em] text-[#172b4d]" id="not-found-title">Có vẻ bạn đã đi lạc</h1>
        <p className="mx-auto mt-3.5 mb-0 max-w-[510px] text-base leading-[1.65] text-[#6b778c]">
          Trang bạn đang tìm có thể đã được di chuyển, xóa hoặc đường dẫn chưa chính xác.
        </p>

        <div className="mt-7 flex justify-center gap-3 max-[520px]:flex-col">
          <Link className={`${actionClasses} bg-[#635bff] text-white shadow-[0_7px_18px_rgba(99,91,255,0.24)] hover:bg-[#5147d9]`} to={homePath}>
            Về trang chính
          </Link>
          <button className={`${actionClasses} bg-[#e9ebf2] text-[#44546f] hover:bg-[#dfe2ea]`} type="button" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </section>
    </main>
  );
}
