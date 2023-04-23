export const GA_MEASUREMENT_ID =
  process.env.GA_MEASUREMENT_ID ?? "G-21VXFHQHH7";

export const pageview = (url) => {
  (window as any).gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
export const event = ({ action, category, label, value }) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
