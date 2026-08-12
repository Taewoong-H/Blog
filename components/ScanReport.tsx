import type { ScanData, ScanStock, WatchingStock } from "@/types/scan";

type ScanReportProps = {
  data: ScanData;
};

const numberFormatter = new Intl.NumberFormat("ko-KR");
const decimalFormatter = new Intl.NumberFormat("ko-KR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});
const generatedDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Seoul",
});

function formatPercent(value: number | null, fractionDigits = 2) {
  if (value === null) return "—";

  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(fractionDigits)}%`;
}

function formatGeneratedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  const parts = Object.fromEntries(
    generatedDateFormatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}.${parts.month}.${parts.day} ${parts.hour}:${parts.minute}`;
}

function momentumClass(value: number) {
  if (value > 0) return "scan-report__number--rise";
  if (value < 0) return "scan-report__number--fall";
  return undefined;
}

function volumeLabel(value: ScanStock["vol_character"]) {
  if (value === "accumulation") return "매집";
  if (value === "distribution") return "분산";
  return "판단 보류";
}

function StockTable({
  stocks,
  watching = false,
}: {
  stocks: Array<ScanStock | WatchingStock>;
  watching?: boolean;
}) {
  return (
    <div className="scan-report__table-wrap">
      <table className="scan-report__table">
        <thead>
          <tr>
            <th>종목</th>
            <th>섹터</th>
            <th className="scan-report__cell--number">피벗 이격</th>
            <th className="scan-report__cell--number">MA20 이격</th>
            <th>거래량 성격</th>
            {watching ? <th>미통과 사유</th> : null}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.ticker}>
              <td>
                <strong className="scan-report__stock-name">{stock.name}</strong>
                <span className="scan-report__ticker">{stock.ticker}</span>
              </td>
              <td>{stock.sector}</td>
              <td className="scan-report__cell--number">
                <span className={stock.dist_from_pivot_pct === null ? "scan-report__null" : undefined}>
                  {formatPercent(stock.dist_from_pivot_pct)}
                </span>
              </td>
              <td className="scan-report__cell--number">
                <span className={stock.dist_from_ma20_pct === null ? "scan-report__null" : undefined}>
                  {formatPercent(stock.dist_from_ma20_pct)}
                </span>
              </td>
              <td>
                <span className="scan-report__volume">{volumeLabel(stock.vol_character)}</span>
              </td>
              {watching ? (
                <td className="scan-report__reason">{(stock as WatchingStock).reason}</td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScanReportUnavailable() {
  return (
    <aside className="scan-report-error" role="status">
      <strong>데이터를 불러올 수 없습니다</strong>
      <span>스캔 원본 파일을 확인한 뒤 다시 시도해 주세요.</span>
    </aside>
  );
}

export default function ScanReport({ data }: ScanReportProps) {
  const { market } = data;
  const isPass = market.gate === "PASS";
  const isFail = market.gate === "FAIL";
  const isConcentrated = market.concentration.pct >= 50;
  const gateTitle = isPass
    ? "시장 폭 기준 통과"
    : isFail
      ? "시장 폭 기준 미통과"
      : "시장 게이트 판정";
  const gateDescription = isPass
    ? "진입 후보를 선별한 날입니다."
    : isFail
      ? "신규 진입을 보수적으로 보는 날입니다."
      : "세부 결과와 공개 기준을 함께 확인하세요.";

  return (
    <section className="scan-report" aria-label={`${data.date} 주가관찰 스캔 결과`}>
      <header className={`scan-report__market${isFail ? " scan-report__market--fail" : ""}`}>
        <div className="scan-report__market-head">
          <div>
            <span className="scan-report__eyebrow">MARKET GATE</span>
            <div className="scan-report__gate-copy">
              <strong>{gateTitle}</strong>
              <span>{gateDescription}</span>
            </div>
          </div>
          <span className="scan-report__gate">{market.gate}</span>
        </div>

        <dl className="scan-report__market-grid">
          <div>
            <dt>상승 / 하락</dt>
            <dd>
              <span className="scan-report__number--rise">{numberFormatter.format(market.advancers)}</span>
              <span aria-hidden="true"> / </span>
              <span className="scan-report__number--fall">{numberFormatter.format(market.decliners)}</span>
            </dd>
          </div>
          <div>
            <dt>등락 비율</dt>
            <dd>{decimalFormatter.format(market.ad_ratio)}배</dd>
          </div>
          <div>
            <dt>신고가</dt>
            <dd>
              {numberFormatter.format(market.new_highs.recent)}
              <small>
                직전 {numberFormatter.format(market.new_highs.prev)} · 추세{" "}
                {formatPercent(market.new_highs.trend_pct, 1)}
              </small>
            </dd>
          </div>
          <div className={isConcentrated ? "scan-report__concentration--high" : undefined}>
            <dt>상승 집중도</dt>
            <dd>
              {market.concentration.pct}%
              <small>{market.concentration.sector}</small>
            </dd>
            {isConcentrated ? <span className="scan-report__warning">시장 폭 좁음</span> : null}
          </div>
        </dl>
      </header>

      <section className="scan-report__section" aria-labelledby="scan-sector-title">
        <div className="scan-report__section-head">
          <div>
            <span className="scan-report__eyebrow">SECTOR RANKING</span>
            <h2 id="scan-sector-title" className="scan-report__section-title">
              섹터 순위
            </h2>
          </div>
          <p className="scan-report__section-note">
            수급 점수는 별도 계산값이며, 지속성·Stage2·모멘텀은 참고 지표입니다.
          </p>
        </div>

        <ol className="scan-report__sector-list">
          {data.sectors.map((sector) => (
            <li key={`${sector.rank}-${sector.name}`} className="scan-report__sector-row">
              <span className="scan-report__rank">{String(sector.rank).padStart(2, "0")}</span>
              <div className="scan-report__sector-main">
                <strong>{sector.name}</strong>
                <dl className="scan-report__sector-metrics">
                  <div>
                    <dt>지속성</dt>
                    <dd>{sector.persistence.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt>Stage2</dt>
                    <dd>{sector.stage2_ratio.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt>모멘텀</dt>
                    <dd className={momentumClass(sector.momentum_pct)}>
                      {formatPercent(sector.momentum_pct, 1)}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="scan-report__score">
                <span>SCORE</span>
                <strong>{sector.score.toFixed(2)}</strong>
                <span className="scan-report__score-track" aria-hidden="true">
                  <span
                    style={{
                      width: `${Math.round(Math.min(100, Math.max(0, sector.score * 100)))}%`,
                    }}
                  />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="scan-report__section" aria-labelledby="scan-candidate-title">
        <div className="scan-report__section-head scan-report__section-head--compact">
          <div>
            <span className="scan-report__eyebrow">ALL CONDITIONS PASSED</span>
            <h2 id="scan-candidate-title" className="scan-report__section-title">
              진입 후보 <span>{data.candidates.length}</span>
            </h2>
          </div>
        </div>
        {data.candidates.length > 0 ? (
          <StockTable stocks={data.candidates} />
        ) : (
          <div className="scan-report__empty">
            <strong>오늘은 진입 조건을 모두 통과한 종목이 없습니다.</strong>
            <span>조건이 맞지 않는 날에는 현금 보유도 하나의 유효한 결과입니다.</span>
          </div>
        )}
      </section>

      <section className="scan-report__section" aria-labelledby="scan-watching-title">
        <div className="scan-report__section-head scan-report__section-head--compact">
          <div>
            <span className="scan-report__eyebrow">NOT YET PASSED</span>
            <h2 id="scan-watching-title" className="scan-report__section-title">
              관찰 중 <span>{data.watching.length}</span>
            </h2>
          </div>
          <p className="scan-report__section-note">진입 조건을 통과하지 않은 종목입니다.</p>
        </div>
        {data.watching.length > 0 ? (
          <StockTable stocks={data.watching} watching />
        ) : (
          <div className="scan-report__empty scan-report__empty--quiet">
            <span>현재 별도로 관찰 중인 종목이 없습니다.</span>
          </div>
        )}
      </section>

      <details className="scan-report__criteria">
        <summary>
          <span>
            <span className="scan-report__eyebrow">METHODOLOGY</span>
            <strong>스크리닝 기준 보기</strong>
          </span>
          <span className="scan-report__summary-mark" aria-hidden="true">+</span>
        </summary>
        <div className="scan-report__criteria-body">
          <section>
            <h3>추세 조건</h3>
            <ul>
              {data.criteria.trend_template.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>진입 조건</h3>
            <ul>
              {data.criteria.entry_filter.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </section>
          <section className="scan-report__criteria-wide">
            <h3>섹터 점수</h3>
            <p>{data.criteria.sector_score}</p>
            <dl>
              <div>
                <dt>지속성</dt>
                <dd>{data.criteria.sector_metrics.persistence}</dd>
              </div>
              <div>
                <dt>Stage2</dt>
                <dd>{data.criteria.sector_metrics.stage2_ratio}</dd>
              </div>
              <div>
                <dt>모멘텀</dt>
                <dd>{data.criteria.sector_metrics.momentum_pct}</dd>
              </div>
            </dl>
          </section>
        </div>
      </details>

      <aside className="scan-report__disclaimer" aria-label="투자 정보 유의사항">
        <strong>유의사항</strong>
        <p>{data.disclaimer}</p>
      </aside>

      <footer className="scan-report__generated">
        <span>SCHEMA v{data.schema_version}</span>
        <span>생성 {formatGeneratedAt(data.generated_at)}</span>
      </footer>
    </section>
  );
}
