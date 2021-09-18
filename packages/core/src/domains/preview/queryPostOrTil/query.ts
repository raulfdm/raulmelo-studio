export const query = `
query PostOrTilQuery($where: JSON) {
  tils(locale: "all", where: $where) {
    slug
    locale
  }
  posts(locale: "all", where: $where){
    slug
    locale
  }
}
`;
