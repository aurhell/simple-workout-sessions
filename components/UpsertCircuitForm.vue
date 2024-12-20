<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

const RECOVERY_DEFAULT = 30
const RECOVERY_STEPS = 10
const RECOVERY_MIN = 10
const RECOVERY_MAX = 300

const ROUND_NB_DEFAULT = 3
const ROUND_NB_STEPS = 1
const ROUND_NB_MIN = 1
const ROUND_NB_MAX = 10

const ROUND_TIME_DEFAULT = 30
const ROUND_TIME_STEPS = 5
const ROUND_TIME_MIN = 10
const ROUND_TIME_MAX = 45

const formSchema = toTypedSchema(z.object({
  recovery: z.number().min(RECOVERY_MIN).max(RECOVERY_MAX),
  roundNumber: z.number().min(ROUND_NB_MIN).max(ROUND_NB_MAX),
  roundTime: z.number().min(ROUND_TIME_MIN).max(ROUND_TIME_MAX),
}))

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    recovery: RECOVERY_DEFAULT,
    roundNumber: ROUND_NB_DEFAULT,
    roundTime: ROUND_TIME_DEFAULT,
  },
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const getTotalTime = computed(() => {
  const { recovery, roundNumber, roundTime } = values
  if (!recovery || !roundNumber || !roundTime) {
    return 0
  }
  return roundNumber * roundTime + (roundNumber - 1) * recovery
})
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center overflow-hidden">
    <div class="mb-12 text-2xl">
      Simple workout circuits
    </div>
    <form
      class="w-1/3 space-y-6"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ value }"
        name="roundNumber"
      >
        <FormItem v-auto-animate>
          <FormLabel>Répétition</FormLabel>
          <NumberField
            class="gap-2"
            :min="ROUND_NB_MIN"
            :max="ROUND_NB_MAX"
            :step="ROUND_NB_STEPS"
            :model-value="value"
            @update:model-value="(v) => {
              if (v) {
                setFieldValue('roundNumber', v)
              }
              else {
                setFieldValue('roundNumber', undefined)
              }
            }"
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <FormControl>
                <NumberFieldInput />
              </FormControl>
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <FormDescription>
            Nombre de répétitions à effectuer.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value }"
        name="roundTime"
      >
        <FormItem v-auto-animate>
          <FormLabel>Durée d'une série</FormLabel>
          <NumberField
            class="gap-2"
            :min="ROUND_TIME_MIN"
            :max="ROUND_TIME_MAX"
            :step="ROUND_TIME_STEPS"
            :model-value="value"
            @update:model-value="(v) => {
              if (v) {
                setFieldValue('roundTime', v)
              }
              else {
                setFieldValue('roundTime', undefined)
              }
            }"
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <FormControl>
                <NumberFieldInput />
              </FormControl>
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <FormDescription>
            Temps passé sur chaque série en secondes.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value }"
        name="recovery"
      >
        <FormItem v-auto-animate>
          <FormLabel>Récup</FormLabel>
          <NumberField
            class="gap-2"
            :min="RECOVERY_MIN"
            :max="RECOVERY_MAX"
            :step="RECOVERY_STEPS"
            :model-value="value"
            :format-options="{
              style: 'unit',
              unit: 'second',
            }"
            @update:model-value="(v) => {
              if (v) {
                setFieldValue('recovery', v)
              }
              else {
                setFieldValue('recovery', undefined)
              }
            }"
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <FormControl>
                <NumberFieldInput />
              </FormControl>
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <FormDescription>
            Temps de récupération en secondes entre chaque série.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="text-center">
        <div class="mb-12">
          Temps total : {{ getTotalTime }} secondes
        </div>
        <Button type="submit">
          GO
        </Button>
      </div>
    </form>
  </div>
</template>
