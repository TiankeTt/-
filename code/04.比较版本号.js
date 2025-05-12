const compareVersionNum = (version1 = '', version2 = '') => {
  if (version1 === version2) return 0
  const v1 = version1.split('.');
  const v2 = version2.split('.');

  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = Number(v1[i]) || 0;
    const num2 = Number(v2[i]) || 0;

    if (num1 > num2) return 1
    if (num1 < num2) return -1
  }
}

console.log(compareVersionNum("1.2.3", "1.2.3")); // 输出 0
console.log(compareVersionNum("1.10.3", "1.9.4")); // 输出 1
console.log(compareVersionNum("1.2.3", "1.1.3")); // 输出 1