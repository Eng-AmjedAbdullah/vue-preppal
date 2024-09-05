<template>
    <ParentDashboardHeader /> <!-- Use the new header here -->
    <section id="parent-dashboard" class="dashboard">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h2>Parent Dashboard</h2>
            <p>Monitor and manage your children's activities on PrepPal.</p>
            
            <!-- Children Details Table -->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Child's Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                  <th>Last Activity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="child in childrenList" :key="child.id">
                  <td>{{ child.name }}</td>
                  <td>{{ child.age }}</td>
                  <td>{{ child.email }}</td>
                  <td>{{ child.registrationDate }}</td>
                  <td>{{ child.lastActivity }}</td>
                  <td>
                    <span :class="['badge', child.status === 'Active' ? 'bg-success' : 'bg-danger']">
                      {{ child.status }}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-info btn-sm" @click="viewChildDetails(child.id)">View Details</button>
                    <button class="btn btn-danger btn-sm" @click="removeChild(child.id)">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <FooterComponent />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ParentDashboardHeader from '../components/ParentDashboardHeader.vue'; // Import new header component
  import FooterComponent from '../components/FooterComponent.vue';
  
  // Example data, replace with actual data fetched from a database
  const childrenList = ref([
    { id: 1, name: 'Ali', age: 10, email: 'ali@example.com', registrationDate: '2024-01-01', lastActivity: '2024-09-01', status: 'Active' },
    { id: 2, name: 'Sara', age: 8, email: 'sara@example.com', registrationDate: '2024-02-15', lastActivity: '2024-09-03', status: 'Inactive' },
    { id: 3, name: 'Omar', age: 12, email: 'omar@example.com', registrationDate: '2024-03-20', lastActivity: '2024-09-04', status: 'Active' }
  ]);
  
  function viewChildDetails(childId) {
    // Logic to display child details
    alert(`Viewing details for child ID: ${childId}`);
  }
  
  function removeChild(childId) {
    // Logic to remove child from monitoring
    if (confirm('Are you sure you want to remove this child?')) {
      childrenList.value = childrenList.value.filter(child => child.id !== childId);
    }
  }
  
  // Fetch children data from backend (this is just a placeholder)
  onMounted(() => {
    // Fetch children data from your backend and populate childrenList
  });
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .table {
    margin-top: 20px;
  }
  
  .table th, .table td {
    text-align: center;
  }
  
  .badge {
    padding: 5px 10px;
    font-size: 14px;
  }
  </style>
  