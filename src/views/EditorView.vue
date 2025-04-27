<script setup>
import MonacoEditor from "monaco-editor-vue3";
import {ref} from "vue";

const javascriptText = ref("");
const htmlText = ref("");
const cssText = ref("");

function updateJavascript(value) {
  javascriptText.value = value;
}

function updateHtml(value) {
  htmlText.value = value;
}

function updateCss(value) {
  cssText.value = value;
}
</script>

<template>
  <h1>Titre</h1>
  <h2>Javascript</h2>
  <MonacoEditor
    v-model="javascriptText"
    language="javascript"
    theme="vs-dark"
    :options="{ automaticLayout: true, accessibilitySupport: true}"
    @update:modelValue="updateJavascript"
  />
  <h2>HTML</h2>
  <MonacoEditor
    v-model="htmlText"
    language="html"
    theme="vs-dark"
    :options="{ automaticLayout: true, accessibilitySupport: true}"
    @update:modelValue="updateHtml"/>
  <h2>CSS</h2>
  <MonacoEditor
    v-model="cssText"
    language="css"
    theme="vs-dark"
    :options="{ automaticLayout: true, accessibilitySupport: true}"
    @update:modelValue="updateCss"/>
</template>

<style scoped>

</style>
