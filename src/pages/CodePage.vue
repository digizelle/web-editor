<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <h1 class="text-4xl font-bold text-slate-900 tracking-tight">{{ template?.title || 'Chargement...' }}</h1>
        <router-link 
          to="/" 
          class="inline-flex items-center gap-2 bg-slate-700 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </router-link>
      </div>

      <div v-if="template" class="grid lg:grid-cols-2 gap-8">
        <!-- Éditeurs de code -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 backdrop-blur">
            <div class="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 font-semibold text-lg flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              HTML
            </div>
            <textarea
              v-model="currentCode.html"
              @input="updatePreview"
              class="w-full h-48 p-6 font-mono text-sm border-none resize-none focus:outline-none focus:ring-4 focus:ring-red-500/20 bg-slate-50/30 transition-all duration-200"
              placeholder="Entrez votre code HTML ici..."
            ></textarea>
          </div>

          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 backdrop-blur">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 font-semibold text-lg flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4a2 2 0 01-2-2V9a2 2 0 012-2h2m0 10h4a2 2 0 002-2v-4a2 2 0 00-2-2h-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              CSS
            </div>
            <textarea
              v-model="currentCode.css"
              @input="updatePreview"
              class="w-full h-48 p-6 font-mono text-sm border-none resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/20 bg-slate-50/30 transition-all duration-200"
              placeholder="Entrez votre code CSS ici..."
            ></textarea>
          </div>

          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 backdrop-blur">
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-4 font-semibold text-lg flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              JavaScript
            </div>
            <textarea
              v-model="currentCode.javascript"
              @input="updatePreview"
              class="w-full h-48 p-6 font-mono text-sm border-none resize-none focus:outline-none focus:ring-4 focus:ring-yellow-500/20 bg-slate-50/30 transition-all duration-200"
              placeholder="Entrez votre code JavaScript ici..."
            ></textarea>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <button
              @click="resetCode"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-slate-600 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Réinitialiser
            </button>
            <button
              @click="toggleConsole"
              class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ showConsole ? 'Masquer' : 'Afficher' }} Console
            </button>
          </div>
        </div>

        <!-- Aperçu et console -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 backdrop-blur">
            <div class="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-4 font-semibold text-lg flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Aperçu en temps réel
            </div>
            <div class="p-2 bg-slate-50">
              <iframe
                ref="previewFrame"
                class="w-full h-[400px] border border-slate-200 rounded-lg bg-white shadow-sm"
                sandbox="allow-scripts"
              ></iframe>
            </div>
          </div>

          <div v-if="showConsole" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 backdrop-blur transition-all duration-300 ease-out">
            <div class="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 font-semibold text-lg flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Console de Débogage
            </div>
            <div class="p-6 bg-slate-900 text-emerald-400 font-mono text-sm min-h-[200px] max-h-[300px] overflow-y-auto">
              <div v-for="(log, index) in consoleLogs" :key="index" class="mb-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div class="flex items-start gap-3">
                  <span class="text-slate-400 text-xs bg-slate-700 px-2 py-1 rounded font-medium">[{{ log.timestamp }}]</span>
                  <span 
                    :class="log.type === 'error' ? 'text-red-400' : 'text-emerald-400'"
                    class="flex-1 break-words"
                  >
                    {{ log.message }}
                  </span>
                </div>
              </div>
              <div v-if="consoleLogs.length === 0" class="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div class="text-slate-500 text-base">
                  Console vide
                </div>
                <div class="text-slate-600 text-sm mt-2">
                  Les console.log() et erreurs apparaîtront ici
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-24">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div class="text-slate-600 text-xl font-medium">Chargement du template...</div>
        <div class="text-slate-400 text-sm mt-2">Veuillez patienter quelques instants</div>
      </div>
    </div>
  </div>
</template><script setup lang="ts">
import {nextTick, onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'

interface Template {
  title: string
  html: string[]
  css: string[]
  javascript: string[]
}

interface CodeState {
  html: string
  css: string
  javascript: string
}

interface ConsoleLog {
  message: string
  type: 'log' | 'error'
  timestamp: string
}

const route = useRoute()
const template = ref<Template | null>(null)
const currentCode = ref<CodeState>({
  html: '',
  css: '',
  javascript: ''
})
const previewFrame = ref<HTMLIFrameElement>()
const showConsole = ref(false)
const consoleLogs = ref<ConsoleLog[]>([])

const loadTemplate = async () => {
  try {
    const response = await fetch(`/templates/${route.params.id}.json`)
    if (response.ok) {
      const data = await response.json()
      template.value = data

      // Charger le code sauvegardé ou utiliser le template par défaut
      const savedCode = localStorage.getItem(`template-${route.params.id}`)
      if (savedCode) {
        currentCode.value = JSON.parse(savedCode)
      } else {
        currentCode.value = {
          html: data.html.join('\n'),
          css: data.css.join('\n'),
          javascript: data.javascript.join('\n')
        }
      }

      await nextTick()
      updatePreview()
    } else {
      console.error('Template non trouvé')
    }
  } catch (error) {
    console.error('Erreur lors du chargement du template:', error)
  }
}

const updatePreview = () => {
  if (!previewFrame.value) return

  // Sauvegarder dans localStorage
  localStorage.setItem(`template-${route.params.id}`, JSON.stringify(currentCode.value))

  // Créer le HTML complet avec console capture
  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${currentCode.value.css}</style>
    </head>
    <body>
      ${currentCode.value.html}
      <script>
        // Capturer les console.log
        const originalLog = console.log;
        const originalError = console.error;

        console.log = function(...args) {
          window.parent.postMessage({
            type: 'console',
            level: 'log',
            message: args.join(' ')
          }, '*');
          originalLog.apply(console, args);
        };

        console.error = function(...args) {
          window.parent.postMessage({
            type: 'console',
            level: 'error',
            message: args.join(' ')
          }, '*');
          originalError.apply(console, args);
        };

        // Capturer les erreurs
        window.onerror = function(message, source, lineno, colno, error) {
          window.parent.postMessage({
            type: 'console',
            level: 'error',
            message: 'Erreur: ' + message
          }, '*');
        };

        try {
          ${currentCode.value.javascript}
        } catch (error) {
          console.error('Erreur JavaScript:', error.message);
        }
      </scr` + `ipt>
    </body>
    </html>
  `

  const blob = new Blob([fullHtml], {type: 'text/html'})
  const url = URL.createObjectURL(blob)
  previewFrame.value.src = url
}

const resetCode = () => {
  if (template.value) {
    currentCode.value = {
      html: template.value.html.join('\n'),
      css: template.value.css.join('\n'),
      javascript: template.value.javascript.join('\n')
    }
    localStorage.removeItem(`template-${route.params.id}`)
    updatePreview()
  }
}

const toggleConsole = () => {
  showConsole.value = !showConsole.value
}

// Écouter les messages de la console depuis l'iframe
window.addEventListener('message', (event) => {
  if (event.data.type === 'console') {
    const now = new Date().toLocaleTimeString()
    consoleLogs.value.push({
      message: event.data.message,
      type: event.data.level,
      timestamp: now
    })

    // Limiter à 50 logs
    if (consoleLogs.value.length > 50) {
      consoleLogs.value = consoleLogs.value.slice(-50)
    }
  }
})

onMounted(() => {
  loadTemplate()
})
</script>
