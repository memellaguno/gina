import { groq } from "next-sanity";

export const POST_WITH_HOME_CTA_QUERY = groq`
{
  "homeCta": *[_type == "page" && slug.current == "home"][0]
    .pageBuilder[_type == "ctaBanner" && style == "newsletter"][0]
}
`;