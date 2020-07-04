export const PAGE_WIDTH_PERCENTAGE = 0.45

export const TITLE_FONT_SIZES = [18, 22, 28]
export const DESC_FONT_SIZE = 16

export const SLIDER_MAX = 3
export const ADFONTES_MAX = 42
export const SLIDER_WRAPPER_WIDTH = 80
export const ADFONTES_TO_PERCENTAGE_FACTOR = SLIDER_WRAPPER_WIDTH/ADFONTES_MAX
export const ADFONTES_TO_PRETTO_FACTOR =SLIDER_MAX/ADFONTES_MAX

export const BIAS_WINDOW_SIZE=1
export const RSS = {
  reuters: {
    about: {name:"AP Reuters", logo:"https://s3.reutersmedia.net/resources_v2/images/favicon/favicon-96x96.png",bias: -0.95},
    feed: {feedLink: "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US", title: "title", desc:"content", link:"link"}},
  dailyKos: {
    about:{ name:"Daily Kos", logo:"https://assets.dailykos.com/assets/favicon-96x96-064e0a6840f921af8baf2d261c07f0cc.png", bias: -21.49},
    feed:{feedLink:"http://www.dailykos.com/blogs/main.rss", title:"title", desc:"contentSnippet", link:"link"}},
  wsj: {
    about:{name:"Wall Street Journal", logo:"https://s.wsj.net/img/meta/wsj_favicon-96x96.png", bias: 1.89},
    feed:{feedLink: "https://feeds.a.dj.com/rss/RSSWorldNews.xml", title: "title", desc:"contentSnippet", link:"link"}},
  npr: {
    about:{name:"National Public Radio", logo:"https://static-assets.npr.org/static/images/favicon/favicon-96x96.png", bias: -2.73},
    feed:{feedLink: "https://feeds.npr.org/1001/rss.xml", title: "title", desc:"content", link:"link"}},
  cnn: {
    about:{name:"CNN", logo:"https://edition.cnn.com/favicon.ie9.ico", bias: -5.69},
    feed:{feedLink: "http://rss.cnn.com/rss/cnn_topstories.rss", title: "title", desc: "contentSnippet", link:"link"}},
  nyt: {
    about:{name:"New York Times", logo:"https://www.nytimes.com/vi-assets/static-assets/favicon-4bf96cb6a1093748bf5b3c429accb9b4.ico", bias: -4.01},
    feed:{feedLink: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", title:"title", desc: "contentSnippet", link:"link"}}
}
