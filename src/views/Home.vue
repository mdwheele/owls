<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div class="bg-white border-b border-gray-200 app-region-drag">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center mr-8">
            <span class="text-3xl">🦉</span>
            <pre class="text-sm text-gray-600 ml-2">/etc/owls</pre>
          </div>

          <!-- Omnisearch -->
          <div class="flex-1 flex">
            <div class="w-full flex md:ml-0">
              <label for="search_field" class="sr-only">Search</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                  </svg>
                </div>
                <input id="search_field" v-model="search" class="app-region-nodrag block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm" placeholder="Search" />
              </div>
            </div>
          </div>

          <div class="flex-1">
            <AddProjectModal @saved="addProject" class="app-region-nodrag"/>
          </div>

          <!-- Window controls -->
          <div class="flex">
            <WindowControls @minimized="minimizeWindow" @closed="closeWindow" class="app-region-nodrag"/>
          </div>
        </div>
      </div>
    </div>
    <div class="flex h-full min-h-0 overflow-scroll">
      <div v-if="projects.length !== 0" class="max-w-7xl w-full py-6 sm:px-6 lg:px-8">
        <!-- Domain -->
        <div class="bg-white overflow-hidden shadow rounded-lg mb-6" v-for="project in filteredProjects" :key="project.hostname">
          <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
              <div class="ml-4 mt-2 flex items-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ project.hostname }}
                </h3>
                <svg v-if="projectActive(project)" @click="deactivateProject(project)" fill="currentColor" viewBox="0 0 477.871 477.871" class="w-6 h-6 ml-4 text-indigo-600 cursor-pointer"><path d="M474.609 228.901a453.124 453.124 0 00-103.219-98.287l67.345-67.345c6.78-6.548 6.968-17.352.42-24.132-6.548-6.78-17.352-6.968-24.132-.42-.142.137-.282.277-.42.42l-73.574 73.506a220.702 220.702 0 00-102.093-27.307C109.229 85.336 7.529 223.03 3.262 228.9a17.068 17.068 0 000 20.07 453.124 453.124 0 00103.219 98.287l-67.345 67.345c-6.78 6.548-6.968 17.352-.42 24.132 6.548 6.78 17.352 6.968 24.132.42.142-.137.282-.277.42-.42l73.574-73.506a220.702 220.702 0 00102.093 27.307c129.707 0 231.407-137.694 235.674-143.565a17.063 17.063 0 000-20.069zm-343.313 93.593a424.95 424.95 0 01-92.484-83.558c25.122-30.43 106.598-119.467 200.124-119.467a180.655 180.655 0 0176.612 18.773L285.92 167.87c-39.2-26.025-92.076-15.345-118.101 23.855-18.958 28.555-18.958 65.691 0 94.246l-36.523 36.523zm153.72-105.489a50.36 50.36 0 015.12 21.931c0 28.277-22.923 51.2-51.2 51.2a50.36 50.36 0 01-21.931-5.12l68.011-68.011zm-92.16 43.861a50.36 50.36 0 01-5.12-21.931c0-28.277 22.923-51.2 51.2-51.2a50.36 50.36 0 0121.931 5.12l-68.011 68.011zm46.08 97.536a180.659 180.659 0 01-76.612-18.773l29.628-29.628c39.2 26.025 92.076 15.345 118.101-23.855 18.958-28.555 18.958-65.691 0-94.246l36.523-36.523a424.975 424.975 0 0192.484 83.558c-25.123 30.431-106.599 119.467-200.124 119.467z"/></svg>
              </div>
              <div class="ml-4 mt-2 flex-shrink-0">
                <span class="inline-flex rounded-md shadow-sm">
                  <AddEnvironmentModal @saved="addEnvironment(project, $event)" />
                  <button @click="removeProject(project)" type="button" class="ml-3 relative inline-flex items-center border border-transparent text-sm leading-5 font-medium text-red-600 focus:outline-none">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div class="px-4 py-5 sm:p-6 flex">
            <!-- Environments -->
            <div v-for="environment in project.environments" :key="`${environment.name}-${environment.ip}`" class="mr-3" @click="activateEnvironment(project, environment)">
              <!-- Active -->
              <div v-if="environment.active" class="group relative p-5 rounded-lg cursor-pointer border-2 border-transparent border-indigo-600">
                <h3 class="uppercase font-semibold text-sm text-indigo-600">{{ environment.name }}</h3>
                <div class="text-2xl text-indigo-600">{{ environment.ip }}</div>
                <svg @click.stop="removeEnvironment(project, environment)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 absolute top-0 right-0 bg-white text-gray-500 hover:text-red-500 -mr-2 -mt-2"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <!-- Inactive -->
              <div v-else class="group relative p-5 rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-400">
                <h3 class="uppercase font-semibold text-sm text-gray-400 group-hover:text-gray-500">{{ environment.name }}</h3>
                <div class="text-2xl text-gray-400 group-hover:text-gray-500">{{ environment.ip }}</div>
                <svg @click.stop="removeEnvironment(project, environment)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 absolute top-0 right-0 bg-white text-gray-500 hover:text-red-500 -mr-2 -mt-2 hidden group-hover:inline"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center h-full bg-white">
        <h3 class="text-3xl mb-3 font-semibold">Draw the owl.</h3>  
        <p>It's time to create an ow- err... project. Make a new project. Yep.</p>      
        <img class="mx-auto block w-1/3 mt-3 mb-5" src="empty-state-large.jpg" />
        <AddProjectModal @saved="addProject">
          <template v-slot="{ on }">
            <button v-on="on" type="button" class="relative inline-flex items-center py-2 pl-2 pr-3 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700">
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-4 h-4 mr-2"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Create Project
            </button>
          </template>
        </AddProjectModal>
      </div>
    </div>

    <Modal v-model="showPermissionsError" v-slot="{ close }" @closed="checkAccess">
      <div class="sm:flex sm:items-start">
        <div class="mx-auto text-2xl flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">🦉</div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-grey-900">
            Whooooops!
          </h3>
          <div class="mt-2 overflow-hidden">
            <p class="text-sm leading-5 text-grey-500">
              It looks like you don't have permissions to edit your hosts file. Here's how you take care of that on {{ os.platform }}:
            </p>
            <div class="hide-scrollbars my-4 text-sm bg-gray-200 py-3 px-4 inline-block rounded-lg font-mono whitespace-no-wrap overflow-x-scroll box-content max-w-lg">{{ os.permissionsTip }}</div>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button @click="close()" type="button" class="inline-flex justify-center w-full rounded-md border border-grey-300 px-4 py-2 bg-white text-base leading-6 font-medium text-grey-700 shadow-sm hover:text-grey-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Retry
          </button>
        </span>
      </div>
    </Modal>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import system from '../services/system.js'

import Modal from '@/components/Modal.vue'
import AddEnvironmentModal from '@/components/AddEnvironmentModal.vue'
import AddProjectModal from '@/components/AddProjectModal.vue'

import WindowControls from '@/components/WindowControls.vue'

export default {
  name: 'Home',
  
  components: { Modal, AddEnvironmentModal, AddProjectModal, WindowControls },

  mounted() {
    if (this.checkAccess()) {
      this.fetchProjects()
    }
  },

  data() {
    return {
      os: {
        platform: system.getPlatformHuman(),
        username: system.getCurrentUser(),
        permissionsTip: system.getPermissionTip()
      },
      showPermissionsError: false,
      showAddProjectModal: false,
      search: '',
      projects: []
    }
  },

  computed: {
    filteredProjects() {
      if (!this.search) {
        return this.projects
      }

      this.fuse = new Fuse(this.projects, {
        keys: ['hostname', 'environments.name']
      });

      return this.fuse.search(this.search).map(hit => hit.item)
    }
  },

  watch: {
    projects: {
      handler: function (val) {
        this.flush(val)
      },
      deep: true
    }
  },

  methods: {
    checkAccess() {
      if (system.checkPermissions()) {
        this.showPermissionsError = false
        this.fetchProjects()
      } else {
        this.showPermissionsError = true
      }
    },

    fetchProjects() {
      if (localStorage.getItem('projects') === null) {
        this.projects = system.getHostsEntries()
      } else {
        this.projects = JSON.parse(localStorage.getItem('projects'))
      }
    },

    projectActive(project) {
      return project.environments.filter(env => env.active).length > 0
    },

    addProject(project) {
      this.projects.push({
        hostname: project.hostname,
        environments: [
          {
            name: 'Local',
            ip: '127.0.0.1',
            active: false
          }
        ]
      })
    },

    removeProject(project) {
      this.projects.splice(this.projects.indexOf(project), 1)
    },

    deactivateProject(project) {
      project.environments.forEach(env => env.active = false)
    },

    addEnvironment(project, environment) {
      project.environments.push({
        ...environment,
        active: false
      })
    },

    activateEnvironment(project, environment) {
      project.environments.forEach(env => {
        env.active = env == environment
      })
    },

    removeEnvironment(project, environment) {
      project.environments.splice(project.environments.indexOf(environment), 1)
    },

    flush(projects) {
      this.$nextTick(() => localStorage.setItem('projects', JSON.stringify(projects)))
      system.saveHostEntries(projects)
    },

    minimizeWindow() {
      const { remote } = require('electron')
      remote.BrowserWindow.getFocusedWindow().minimize()
    },

    closeWindow() {
      const { remote } = require('electron')
      remote.BrowserWindow.getFocusedWindow().close()
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent;
}
</style>