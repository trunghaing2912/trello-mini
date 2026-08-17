import { Link, useNavigate } from "react-router-dom";

type NotFoundProps = {
  homePath: string;
};

export default function NotFound({ homePath }: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <section className="not-found-card" aria-labelledby="not-found-title">
        <Link className="not-found-brand" to={homePath} aria-label="Trello Mini - Trang chủ">
          <span aria-hidden="true">T</span>
          <strong>Trello Mini</strong>
        </Link>

        <div className="not-found-illustration" aria-hidden="true">
          <span className="not-found-orbit not-found-orbit-one" />
          <span className="not-found-orbit not-found-orbit-two" />
          <span className="not-found-number">404</span>
          <span className="not-found-card-shape not-found-card-one" />
          <span className="not-found-card-shape not-found-card-two" />
          <span className="not-found-dot not-found-dot-one" />
          <span className="not-found-dot not-found-dot-two" />
        </div>

        <p className="not-found-eyebrow">Trang không tồn tại</p>
        <h1 id="not-found-title">Có vẻ bạn đã đi lạc</h1>
        <p className="not-found-description">
          Trang bạn đang tìm có thể đã được di chuyển, xóa hoặc đường dẫn chưa chính xác.
        </p>

        <div className="not-found-actions">
          <Link className="not-found-primary" to={homePath}>
            Về trang chính
          </Link>
          <button className="not-found-secondary" type="button" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </section>
    </main>
  );
}
