export default {
  metaInfo() {
    return {
      title: this.seoTitle || 'Velasquez Funeral and Chapel',
      titleTemplate: '%s | Velasquez Funeral and Chapel',
      meta: [
        {
          name: 'description',
          content: this.seoDescription || 'Compassionate funeral services in Cabiao, Nueva Ecija since 1970.'
        },
        {
          name: 'keywords',
          content: this.seoKeywords || 'funeral services Cabiao, funeral home Nueva Ecija'
        },
        // Open Graph
        {
          property: 'og:title',
          content: this.seoTitle || 'Velasquez Funeral and Chapel'
        },
        {
          property: 'og:description',
          content: this.seoDescription || 'Compassionate funeral services in Cabiao, Nueva Ecija since 1970.'
        },
        {
          property: 'og:image',
          content: this.seoImage || 'https://velasquezfuneral.com/images/velasquez-funeral-og.jpg'
        },
        {
          property: 'og:url',
          content: `https://velasquezfuneral.com${this.$route.path}`
        },
        // Twitter
        {
          name: 'twitter:title',
          content: this.seoTitle || 'Velasquez Funeral and Chapel'
        },
        {
          name: 'twitter:description',
          content: this.seoDescription || 'Compassionate funeral services in Cabiao, Nueva Ecija since 1970.'
        },
        {
          name: 'twitter:image',
          content: this.seoImage || 'https://velasquezfuneral.com/images/velasquez-funeral-og.jpg'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://velasquezfuneral.com${this.$route.path}`
        }
      ]
    }
  }
}