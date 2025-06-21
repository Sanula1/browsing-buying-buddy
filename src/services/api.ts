const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  // Auth endpoints
  async login(credentials: { phoneNumber: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      // Handle non-JSON error responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      } else {
        // Handle plain text responses
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }
    }
    
    return response.json();
  }

  async validateToken() {
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      return false;
    }
    
    const result = await response.json();
    return result === true || result.valid === true;
  }

  // Villages
  async getAllVillages() {
    const response = await fetch(`${API_BASE_URL}/village`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createVillage(village: any) {
    const response = await fetch(`${API_BASE_URL}/village`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(village)
    });
    return response.json();
  }

  async updateVillage(id: number, village: any) {
    const response = await fetch(`${API_BASE_URL}/village/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(village)
    });
    return response.json();
  }

  async deleteVillage(id: number) {
    const response = await fetch(`${API_BASE_URL}/village/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.ok;
  }

  // Temples
  async getAllTemples() {
    const response = await fetch(`${API_BASE_URL}/temple`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createTemple(temple: any) {
    const response = await fetch(`${API_BASE_URL}/temple`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(temple)
    });
    return response.json();
  }

  async updateTemple(id: number, temple: any) {
    const response = await fetch(`${API_BASE_URL}/temple/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(temple)
    });
    return response.json();
  }

  async deleteTemple(id: number) {
    const response = await fetch(`${API_BASE_URL}/temple/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.ok;
  }

  // Families
  async getAllFamilies() {
    const response = await fetch(`${API_BASE_URL}/family`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createFamily(family: any) {
    const response = await fetch(`${API_BASE_URL}/family`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(family)
    });
    return response.json();
  }

  async updateFamily(id: number, family: any) {
    const response = await fetch(`${API_BASE_URL}/family/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(family)
    });
    return response.json();
  }

  async deleteFamily(id: number) {
    const response = await fetch(`${API_BASE_URL}/family/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.ok;
  }

  // Dana
  async getAllDanas() {
    const response = await fetch(`${API_BASE_URL}/dana`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createDana(dana: any) {
    const response = await fetch(`${API_BASE_URL}/dana`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(dana)
    });
    return response.json();
  }

  async updateDana(id: number, dana: any) {
    const response = await fetch(`${API_BASE_URL}/dana/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(dana)
    });
    return response.json();
  }

  async deleteDana(id: number) {
    const response = await fetch(`${API_BASE_URL}/dana/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.ok;
  }

  // Members
  async getAllMembers() {
    const response = await fetch(`${API_BASE_URL}/member`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createMember(member: any) {
    const response = await fetch(`${API_BASE_URL}/member`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(member)
    });
    return response.json();
  }

  async updateMember(id: number, member: any) {
    const response = await fetch(`${API_BASE_URL}/member/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(member)
    });
    return response.json();
  }

  async deleteMember(id: number) {
    const response = await fetch(`${API_BASE_URL}/member/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.ok;
  }

  // Assignments
  async getAllAssignments() {
    const response = await fetch(`${API_BASE_URL}/temple-dana-assignment`, {
      headers: this.getAuthHeaders()
    });
    return response.json();
  }

  async createAssignment(assignment: any) {
    const response = await fetch(`${API_BASE_URL}/temple-dana-assignment`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(assignment)
    });
    return response.json();
  }

  async updateAssignment(id: number, assignment: any) {
    const response = await fetch(`${API_BASE_URL}/temple-dana-assignment/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(assignment)
    });
    return response.json();
  }

  async deleteAssignment(id: number) {
    const response = await fetch(`${API_BASE_URL}/temple-dana-assignment/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return response.ok;
  }
}

export const apiService = new ApiService();
