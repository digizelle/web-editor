<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">{{ template?.title || 'Chargement...' }}</h1>
      <router-link 
        to="/" 
        class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        ← Retour à l'accueil
      </router-link>
    </div>

    <div v-if="template" class="grid lg:grid-cols-2 gap-6">
      <!-- Éditeurs de code -->
      <div class="space-y-4">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-red-500 text-white px-4 py-2 font-medium">HTML</div>
          <textarea
            v-model="currentCode.html"
            @input="updatePreview"
            class="w-full h-40 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Entrez votre code HTML ici..."
          ></textarea>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-blue-500 text-white px-4 py-2 font-medium">CSS</div>
          <textarea
            v-model="currentCode.css"
            @input="updatePreview"
            class="w-full h-40 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre code CSS ici..."
          ></textarea>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-yellow-500 text-white px-4 py-2 font-medium">JavaScript</div>
          <textarea
            v-model="currentCode.javascript"
            @input="updatePreview"
            class="w-full h-40 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Entrez votre code JavaScript ici..."
          ></textarea>
        </div>

        <div class="flex space-x-4">
          <button
            @click="resetCode"
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Réinitialiser
          </button>
          <button
            @click="toggleConsole"
            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            {{ showConsole ? 'Masquer' : 'Afficher' }} Console
          </button>
        </div>
      </div>

      <!-- Aperçu et console -->
      <div class="space-y-4">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-gray-700 text-white px-4 py-2 font-medium">Aperçu</div>
          <iframe
            ref="previewFrame"
            class="w-full h-96 border-none"
            sandbox="allow-scripts"
          ></iframe>
        </div>

        <div v-if="showConsole" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-gray-800 text-white px-4 py-2 font-medium">Console de Débogage</div>
          <div class="p-4 bg-gray-900 text-green-400 font-mono text-sm h-32 overflow-y-auto">
            <div v-for="(log, index) in consoleLogs" :key="index" class="mb-1">
              <span class="text-gray-500">[{{ log.timestamp }}]</span>
              <span :class="log.type === 'error' ? 'text-red-400' : 'text-green-400'">
                {{ log.message }}
              </span>
            </div>
            <div v-if="consoleLogs.length === 0" class="text-gray-500">
              Console vide - Les console.log() et erreurs apparaîtront ici
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <div class="text-gray-500">Chargement du template...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

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
  
  const blob = new Blob([fullHtml], { type: 'text/html' })
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