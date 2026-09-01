/* OVM Malaysia contact details. Shared by the Footer and the Contact page so
   there is a single place to change them. */

export const CONTACT = {
  address:
    "No. 26-3 (3rd Floor), Jln PJU 5/20B The Strand, Kota Damansara, 47810 Petaling Jaya, Selangor",
  phone: "017-372 0090",
  phoneHref: "tel:+60173720090",
  email: "guox@ovm.cn",
  emailCc: "keertigaletchumanan@ovm.cn",
  linkedin:
    "https://www.linkedin.com/company/ovm-prestressing-technology-m-sdn-bhd-ovm-malaysia/",
  website: "https://www.ovm.cn/",
};

/* Mail links send to both recipients — mailto: accepts a comma-separated
   list. The displayed text everywhere stays CONTACT.email alone. */
export const EMAIL_HREF = `mailto:${CONTACT.email},${CONTACT.emailCc}`;

/* Keyless Google Maps embed — resolves the address as a search query, so it
   needs no API key and no billing account. */
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  CONTACT.address,
)}&output=embed`;

/* Opens the address in the Google Maps app (or the web map) in a new tab. */
export const MAP_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=No.+26-3+(3rd+Floor)+Jln+PJU+5/20B+The+Strand+Kota+Damansara+47810+Petaling+Jaya+Selangor";
