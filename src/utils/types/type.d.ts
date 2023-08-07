type ResetPasswordAlertIconProps = 'info' | 'success' | 'error' | 'warning';
type ResetPasswordAlertColorProps =
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | undefined;

type JSONObject = {
  [key: string]: any;
};

type CardProps = {
  propertyid: string;
  situsfullstreetaddress: string;
  situslongitude: string;
  situslatitude: string;
  ownername1full: string;
  age: string;
  telephone: string;
  email: string;
  currentsalesprice?: string;
  currentavmvalue?: string;
  equity?: string;
  sales_date?: string;
  yearbuilt?: string;
  sumbuildingsqft?: string;
  bedrooms?: string;
  bathtotalcalc?: string;
};
