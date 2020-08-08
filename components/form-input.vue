<template functional>
  <input :type="props.type" :name="props.name" :placeholder="props.placeholder" @input="props.writeText(props.name, $event)" required>
</template>
<style lang="scss" scoped>
input {
  display: block;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 30px;
  outline: none;
}
</style>
