export default function sitemap() {
    const baseUrl = 'https://ieee-ruet-sb.org';
    
    // Core pages
    const routes = [
      '',
      '/about/ieee',
      '/about/region-10',
      '/about/bangladesh-section',
      '/about/ruet-sb',
      '/about/membership',
      '/chapters/ias',
      '/chapters/ras',
      '/chapters/cs',
      '/chapters/sps',
      '/affinity-groups/wie',
      '/events/upcoming-events',
      '/events/past-events/2025',
      '/gallery',
      '/publications',
      '/executive-committee',
      '/hall-of-fame',
      '/achievements',
      '/featured',
      '/contact',
      '/faqs',
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    }));
  
    return routes;
  }
  