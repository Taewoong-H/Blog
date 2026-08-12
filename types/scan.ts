export type ScanMarket = {
  gate: string;
  ad_ratio: number;
  advancers: number;
  decliners: number;
  new_highs: {
    recent: number;
    prev: number;
    trend_pct: number;
  };
  concentration: {
    sector: string;
    pct: number;
  };
};

export type ScanSector = {
  rank: number;
  name: string;
  score: number;
  persistence: number;
  stage2_ratio: number;
  momentum_pct: number;
};

export type ScanStock = {
  ticker: string;
  name: string;
  sector: string;
  dist_from_pivot_pct: number | null;
  dist_from_ma20_pct: number | null;
  vol_character: "accumulation" | "distribution" | "unknown";
};

export type WatchingStock = ScanStock & {
  reason: string;
};

export type ScanCriteria = {
  trend_template: string[];
  entry_filter: string[];
  sector_score: string;
  sector_metrics: {
    persistence: string;
    stage2_ratio: string;
    momentum_pct: string;
  };
};

export type ScanData = {
  schema_version: number;
  date: string;
  generated_at: string;
  market: ScanMarket;
  sectors: ScanSector[];
  candidates: ScanStock[];
  watching: WatchingStock[];
  criteria: ScanCriteria;
  disclaimer: string;
};
