export function getEmailFromToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = JSON.parse(atob(payloadBase64));
      return payloadDecoded.sub || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }  