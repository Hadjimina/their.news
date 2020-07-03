export const PAGE_WIDTH_PERCENTAGE = 0.45

export const TITLE_FONT_SIZES = [18, 22, 28]
export const DESC_FONT_SIZE = 16

export const RSS = {
  reuters: {bias: -0.95, feedLink: "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US", title: "title", desc:"content", link:"link"},
  dailyKos: {bias: -21.49,feedLink:"http://www.dailykos.com/blogs/main.rss", title:"title", desc:"contentSnippet", link:"link"},
  wsj: {bias: 1.89,feedLink: "https://feeds.a.dj.com/rss/RSSWorldNews.xml", title: "title", desc:"contentSnippet", link:"link"},
  npr: {bias: -2.73,feedLink: "https://feeds.npr.org/1001/rss.xml", title: "title", desc:"content", link:"link"},
  cnn: {bias: -5.69,feedLink: "http://rss.cnn.com/rss/cnn_topstories.rss", title: "title", desc: "contentSnippet", link:"link"},
  nyt: {bias: -4.01,feedLink: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", title:"title", desc: "contentSnippet", link:"link"}
}
