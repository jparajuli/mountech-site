export interface RouteState {
  page: string;
  courseId: string;
}

export interface TrustPartner {
  id: string;
  name: string;
  nepaliName?: string;
  category: 'Banking' | 'Telecom' | 'NGO & Research' | 'Government & Public';
  tagline: string;
  sampleBadge: string;
}

export interface StatMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
  trend: string;
}

export interface CoreSolution {
  id: string;
  title: string;
  categoryBadge: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  targetPage: string;
  ctaText: string;
}

export interface DisasterLayer {
  layer: number;
  layerCode: string;
  title: string;
  category: string;
  summary: string;
  dataSources: string[];
  modelsAndTech: string[];
  outputArtifact: string;
  operationalStatus: 'Active Continuous' | 'Predictive Mesh' | 'Multi-Channel Standby';
}

export interface BasinSensorData {
  station: string;
  riverBasin: string;
  currentLevelM: number;
  warningLevelM: number;
  dangerLevelM: number;
  trend: 'Rising' | 'Stable' | 'Receding';
  riskScore: number;
  lastReading: string;
}
