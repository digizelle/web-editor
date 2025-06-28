<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Créer un Nouveau Template</h1>
      <router-link 
        to="/" 
        class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        ← Retour à l'accueil
      </router-link>
    </div>

    <div class="bg-blue-50 rounded-lg p-4">
      <h2 class="text-lg font-semibold text-blue-900 mb-2">Instructions</h2>
      <p class="text-blue-800 text-sm">
        Créez votre template en saisissant le code HTML, CSS et JavaScript. 
        Utilisez l'aperçu pour tester votre code, puis générez le fichier JSON à sauvegarder dans le dossier 
        <code class="bg-blue-200 px-1 rounded">public/templates/</code>.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Éditeurs de code -->
      <div class="space-y-4">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-gray-700 text-white px-4 py-2 font-medium">
            <input
              v-model="templateTitle"
              placeholder="Titre du template..."
              class="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full"
            />
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-red-500 text-white px-4 py-2 font-medium">HTML</div>
          <textarea
            v-model="code.html"
            @input="updatePreview"
            class="w-full h-40 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Entrez votre code HTML ici..."
          ></textarea>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-blue-500 text-white px-4 py-2 font-medium">CSS</div>
          <textarea
            v-model="code.css"
            @input="updatePreview"
            class="w-full h-40 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre code CSS ici..."
          ></textarea>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-yellow-500 text-white px-4 py-2 font-medium">JavaScript</div>
          <textarea
            v-model="code.javascript"
            @input="updatePreview"
            class="w-full h-40 p-4 font-mono text-sm border-none resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Entrez votre code JavaScript ici..."
          ></textarea>
        </div>

        <div class="flex space-x-4">
          <button
            @click="clearAll"
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Tout Effacer
          </button>
          <button
            @click="generateJson"
            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Générer JSON
          </button>
        </div>
      </div>

      <!-- Aperçu et JSON généré -->
      <div class="space-y-4">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-gray-700 text-white px-4 py-2 font-medium">Aperçu</div>
          <iframe
            ref="previewFrame"
            class="w-full h-96 border-none"
            sandbox="allow-scripts"
          ></iframe>
        </div>

        <div v-if="generatedJson" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-purple-600 text-white px-4 py-2 font-medium flex justify-between items-center">
            <span>JSON Généré</span>
            <button
              @click="copyJson"
              class="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded text-sm transition-colors"
            >
              {{ copied ? 'Copié !' : 'Copier' }}
            </button>
          </div>
          <pre class="p-4 bg-gray-50 text-sm overflow-x-auto max-h-64 overflow-y-auto"><code>{{ generatedJson }}</code></pre>
        </div>

        <div v-if="generatedJson" class="bg-yellow-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-yellow-900 mb-2">Comment utiliser ce template</h3>
          <ol class="text-yellow-800 text-sm space-y-1 list-decimal list-inside">
            <li>Copiez le JSON ci-dessus</li>
            <li>Créez un nouveau fichier dans <code class="bg-yellow-200 px-1 rounded">public/templates/</code></li>
            <li>Nommez le fichier avec un numéro (ex: <code class="bg-yellow-200 px-1 rounded">4.json</code>)</li>
            )
            <li>Collez le JSON dans le fichier et sauvegardez</li>
            <li>Votre template sera accessible via <code class="bg-yellow-200 px-1 rounded">/code/4</code></li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface CodeState {
  html: string
  css: string
  javascript: string
}

const templateTitle = ref('Mon Nouveau Template')
const code = ref<CodeState>({
  html: '<h1>Bonjour le monde !</h1>\n<p>Ceci est mon template personnalisé.</p>',
  css: 'body {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}',
  javascript: 'console.log("Template créé avec succès !");\n\n// Ajoutez votre code JavaScript ici'
})

const previewFrame = ref<HTMLIFrameElement>()
const generatedJson = ref('')
const copied = ref(false)

const updatePreview = async () => {
  if (!previewFrame.value) return
  
  await nextTick()
  
  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${code.value.css}</style>
    </head>
    <body>
      ${code.value.html}
      <script>
        try {
          ${code.value.javascript}
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

const clearAll = () => {
  templateTitle.value = 'Mon Nouveau Template'
  code.value = {
    html: '',
    css: '',
    javascript: ''
  }
  generatedJson.value = ''
  updatePreview()
}

const generateJson = () => {
  const template = {
    title: templateTitle.value,
    html: code.value.html.split('\n').filter(line => line.trim() !== ''),
    css: code.value.css.split('\n').filter(line => line.trim() !== ''),
    javascript: code.value.javascript.split('\n').filter(line => line.trim() !== '')
  }
  
  generatedJson.value = JSON.stringify(template, null, 2)
}

const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(generatedJson.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Erreur lors de la copie:', error)
  }
}

// Initialiser l'aperçu
updatePreview()
</script>