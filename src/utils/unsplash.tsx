// Utility wrapper for the unsplash_tool function
export async function getUnsplash(query: string): Promise<string> {
  return getUnsplashImage(query);
}

export async function getUnsplashImage(query: string): Promise<string> {
  try {
    // Since we can't directly import the unsplash_tool in components,
    // we'll simulate it by returning demo images for now
    // In production, this would make an API call to Unsplash
    
    const demoImages: { [key: string]: string } = {
      // Existing gallery images
      'happy african woman beautiful hair salon': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc1OTEzMTIwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'before hair dreadlocks african': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwYmVmb3JlfGVufDF8fHx8MTc1OTEzMTIwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'beautiful dreadlocks african woman styled': 'https://images.unsplash.com/photo-1594736797933-d0402e1477a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVhZGxvY2tzJTIwYWZyaWNhbiUyMHdvbWFufGVufDF8fHx8MTc1OTEzMTIwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      
      // Shop hero image
      'african woman hair products shopping': 'https://images.unsplash.com/photo-1702236242829-a34c39814f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBzaG9wcGluZyUyMGhhaXIlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTkxMzc2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      
      // Product images
      'natural hair products shampoo': 'https://images.unsplash.com/photo-1728842961418-248cbe78f7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMHNoYW1wb28lMjBib3R0bGV8ZW58MXx8fHwxNzU5MTM3NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'hair oil bottle': 'https://images.unsplash.com/photo-1669281393403-e1f3248dce2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwb2lsJTIwYm90dGxlJTIwY29zbWV0aWNzfGVufDF8fHx8MTc1OTEzNzYwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      'styling gel jar': 'https://images.unsplash.com/photo-1734111719430-fe4a3973f8af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwZ2VsJTIwamFyJTIwc3R5bGluZ3xlbnwxfHx8fDE3NTkxMzc2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'silk hair bonnet': 'https://images.unsplash.com/photo-1588080270689-73eead74fa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwYm9ubmV0JTIwaGFpciUyMGNhcmV8ZW58MXx8fHwxNzU5MTM3NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'cleansing shampoo bottle': 'https://images.unsplash.com/photo-1728842961418-248cbe78f7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMHNoYW1wb28lMjBib3R0bGV8ZW58MXx8fHwxNzU5MTM3NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'hair spray bottle': 'https://images.unsplash.com/photo-1701977082153-4ac2c0e9899d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3ByYXklMjBib3R0bGUlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzU5MTM3NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'wooden hair comb': 'https://images.unsplash.com/photo-1669646100849-8c064be27dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBoYWlyJTIwY29tYnxlbnwxfHx8fDE3NTkxMzc2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'satin pillowcase': 'https://images.unsplash.com/photo-1706816365424-a35678715ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRpbiUyMHBpbGxvd2Nhc2UlMjBiZWRyb29tfGVufDF8fHx8MTc1OTEzNzYyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'hair care products': 'https://images.unsplash.com/photo-1728842961418-248cbe78f7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGFpciUyMHNoYW1wb28lMjBib3R0bGV8ZW58MXx8fHwxNzU5MTM3NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    };
    
    return demoImages[query] || 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc1OTEzMTIwNXww&ixlib=rb-4.1.0&q=80&w=1080';
  } catch (error) {
    console.error('Error getting image:', error);
    return '';
  }
}