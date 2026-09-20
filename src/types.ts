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

export interface EmailVerificationState {
  email: string;
  code: string;
  expiresAt: number;
  attemptsLeft: number;
  isVerified: boolean;
  token?: string;
  dispatchedAt: string;
}

export type PaymentGatewayType = 'esewa' | 'khalti' | 'connectips' | 'card';

export interface PaymentVerificationDetails {
  courseId: string;
  courseTitle: string;
  amount: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  gateway: PaymentGatewayType;
  transactionReference: string;
  senderWalletOrAccount?: string;
}

export interface PaymentVerificationResult {
  verified: boolean;
  status: 'SETTLED' | 'PENDING' | 'REJECTED';
  receiptId: string;
  verificationHash: string;
  gatewayTxId: string;
  timestamp: string;
  clearingFeeNpr: number;
  message: string;
}

export interface EnrollmentRecord {
  id: string;
  receiptId: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  experienceLevel: string;
  paymentMethod: PaymentGatewayType;
  transactionId: string;
  tuitionPaid: string;
  verificationHash: string;
  emailVerified: boolean;
  paymentStatus: 'VERIFIED' | 'SETTLED' | 'PENDING';
  enrolledAt: string;
}

export type ConnectionProtocol = 'rest_tls13' | 'zerotrust_ws' | 'sovereign_hydromesh';

export interface ContactRecord {
  id: string;
  transmissionId: string;
  name: string;
  email: string;
  organization: string;
  topic: string;
  query: string;
  connectionMethod: ConnectionProtocol;
  encryptionAlgorithm: string;
  checksum: string;
  status: 'DELIVERED' | 'QUEUED' | 'PROCESSED';
  timestamp: string;
  ipMock?: string;
}

export interface DatabaseStats {
  enrollmentsCount: number;
  contactsCount: number;
  lastSyncTimestamp: string;
  storageEngine: string;
  status: 'ONLINE_HEALTHY' | 'SYNCING' | 'DEGRADED';
}
