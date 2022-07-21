declare module '*.sass' {
  const content: { [className: string]: string };
  export = content;
}
declare module "*.png" {
  const value: string;
  export default value;
}
declare module 'js-cookie'