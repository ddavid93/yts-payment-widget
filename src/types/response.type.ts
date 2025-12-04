/* ---------------- ACCOUNT ---------------- */

export interface IAccount {
  contact: IAccountContactWrapper;
  currency: string;
  hash: string;
  id: number;
  legal_name: string | null;
  name: string;
  tenant: string;
  timezone: string;
  url_logo: string;
}

export interface IAccountContact {
  created_at: string;
  email: string;
  facebook: string;
  fax: string;
  id: number;
  instagram: string;
  mobil: string;
  phone: string;
  pinterest: string;
  twitter: string;
  updated_at: string;
  website: string;
  whatsapp: string | null;
}

export interface IAccountContactWrapper {
  data: IAccountContact;
}

export interface IAccountWrapper {
  data: IAccount;
}

/* ---------------- API ---------------- */

export interface IApi {
  endpoint: string;
  operations: {
    products: IApiOperation;
    proposal: IApiOperation;
  };
}

export interface IApiOperation {
  method: string;
  path: string;
}

/* ---------------- CONFIG ---------------- */

export interface IConfig {
  "partner.account_id": string;
  adults_max_count: number;
  children_max_age: number;
  children_max_count: number;
  children_min_age: number;
  custom_labels: ICustomLabel[];
  custom_translations: unknown[]; // empty array, if needed → create type later
  enable_per_room_calendar: boolean;
  fields: Record<string, IFieldConfig>;
  metasearch: IMetasearch;
  offers_placement: string;
  offers_tab_mode: string;
  participants_max_count: number;
  pets_enabled: boolean;
  pets_max_count: number;
  privacy_consent: IPrivacyConsent;
  privacy_consent_enabled: boolean;
  promocode_enabled: boolean;
  rooms_max_count: number;
  services: IService[];
  services_enabled: boolean;
  services_output_type: string;
  services_placement: string;
  services_placement_scope: string;
  services_visible: (number | null)[];
  show_children_selector: boolean;
  show_last_room_available_flag: boolean;
  show_non_bookable_rooms: boolean;
  show_url_request: boolean;
  terms: ITerms;
  terms_type: string;
  thank_you_page: string;
  tracking_params: ITrackingParams;
  url_request: IUrlRequest;
}

export interface ICustomLabel {
  label: string;
  placeholder: string;
}

export interface IFieldConfig {
  mandatory?: boolean;
  show: boolean;
  tenant?: string;
}

export interface IMetasearch {
  calendar: boolean;
  manageavailability: boolean;
}

export interface IPrivacyConsent {
  label: string;
  url: string;
}

export interface ITerms {
  label: string;
  text: string;
  url: string;
}

export interface ITrackingParams {
  pos: string;
  utm_campaign: string;
  utm_medium: string;
  utm_source: string;
}

export interface IUrlRequest {
  url: string;
}

/* ---------------- PAYMENT METHODS ---------------- */

export interface IPaymentMethod {
  default: boolean;
  description: string;
  gateway_brands: string[];
  id: number;
  priority: number;
  provider_slug: string;
  provider_type: number;
  title: string;
  transaction_type: number;
}

export interface IPaymentMethodsWrapper {
  data: IPaymentMethod[];
}

/* ---------------- SERVICES ---------------- */

export interface IMediaResource {
  copyright: string | null;
  description: string | null;
  id: number;
  mimetype: string;
  provider: string;
  public_id: string;
  title: string | null;
  type: string;
  url: string;
  url_preview: string;
  url_public: string;
  version: string;
}

export interface IService {
  description: string;
  gallery: IMediaResource[];
  id: number;
  panorama: IMediaResource[];
  picture: IMediaResource[];
  title: string;
  video: IMediaResource[];
}

/* ---------------- STYLE ---------------- */

export interface INotAllowedDepartureStyle {
  background_color: string;
  style: string;
}

export interface IStyle {
  availability: IStyleColorBlock;
  box: IStyleColorBlock;
  cta: IStyleColorBlock;
  flags: IStyleColorFontBlock;
  general: IStyleGeneral;
  grid_style: string;
  no_availability: IStyleColorBlock;
  not_allowed_departure: INotAllowedDepartureStyle;
  secondaryCta: IStyleColorBlock;
  selected_period: IStyleColorBlock;
  service: IStyleColorBlock;
  step: IStyleStep;
  title: IStyleColorFontBlock;
}

export interface IStyleColorBlock {
  background_color: string;
  font_color: string;
}

export interface IStyleColorFontBlock extends IStyleColorBlock {
  font_family?: string | null;
}

export interface IStyleGeneral {
  background_color: string;
  font_color: string;
  font_family: string | null;
}

export interface IStyleStep extends IStyleColorBlock {
  font_family: string | null;
  icon_color: string;
}

/* ---------------- WIDGET RESPONSE ---------------- */

export interface IWidgetResponse {
  account: IAccountWrapper;
  api: IApi;
  config: IConfig;
  locale: string;
  payment_methods: IPaymentMethodsWrapper;
  style: IStyle;
  style_css: string;
  uuid: string;
  version: string;
}
