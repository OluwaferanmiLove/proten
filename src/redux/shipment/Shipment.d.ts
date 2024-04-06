export interface ShipmentResponse {
  message: ShipmentType[];
}

export interface ShipmentType {
  name: string;
  creation: Date;
  modified: Date;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  sender: Sender;
  origin_area: null;
  origin_city: string;
  sender_phone: null;
  sender_name: string;
  origin_adress_line_1: null;
  origin_country: string;
  sender_address: null;
  origin_address_line2: null;
  origin_state: string;
  consignee: string;
  destination_area: null;
  destination_city: string;
  consignee_phone: null;
  consignee_name: null;
  destination_address_line_1: null;
  destination_country: string;
  consignee_address: null;
  destination_address_line_2: null;
  destination_state: string;
  origin_zone: string;
  destination_zone: string;
  service: null;
  total_weight: number;
  status: Status;
  movable_units: null;
  amended_from: null;
  company: string;
  cod: number;
  total_cod: number;
  barcode: string;
  branch: null;
  currency: Currency;
  pieces: number;
  not_available: number;
  percentage: number;
  total_fees: number;
  awb_terms_template: null;
  awb_terms_and_conditions: null;
  sales_invoice_created: number;
  _user_tags: null;
  _comments: null | string;
  _assign: null;
  _liked_by: null;
  geolocation_evkp: null;
  shipping_service: string;
  delivery_time: null;
  from_client_side: number;
  destination_branch: null;
  origin_branch: null;
  delivery_due_date: null;
  company_currency: Currency;
  exchange_rate: number;
  overdue: number;
  posting_date: Date;
  posting_time: string;
  is_returned: number;
  custodian: null;
  assignee: null;
  closed: number;
  custodian_commission: number;
  awb_date: Date;
  type: null;
  origin_address_line_1: null;
  service_type: null;
  adjusted_cod: number;
}

export enum Currency {
  EGP = 'EGP',
}

export interface ShipmentParms {
  doctype: string;
  fields: string[];
  filters?: Filters;
}

export interface Filters {
  name: string[];
}

export interface ShipmentStatusResponse {
  message: ShipmentStatus[];
}

export interface ShipmentStatus {
  name: string;
  creation: Date;
  modified: Date;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  status: string;
  color: string;
  _user_tags: null;
  _comments: null;
  _assign: null;
  _liked_by: null;
}
