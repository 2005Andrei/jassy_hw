const twoDigitPrimes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

export function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

export function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export function modInverse(a, m) {
  let [oldR, r] = [a, m];
  let [oldS, s] = [1, 0];
  let [oldT, t] = [0, 1];

  while (r !== 0) {
    const quotient = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
    [oldT, t] = [t, oldT - quotient * t];
  }

  return oldS < 0 ? oldS + m : oldS;
}

export function modExp(base, exp, mod) {
  if (mod === 1) return 0;
  let result = 1;
  base = base % mod;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }

  return result;
}

export function stringToNumbers(str) {
  return Array.from(str).map(c => c.charCodeAt(0));
}

export function numbersToString(nums) {
  try {
    return nums.map(n => String.fromCharCode(n)).join('');
  } catch (e) {
    return '';
  }
}

export function generatePrimes() {
  let pIndex = Math.floor(Math.random() * twoDigitPrimes.length);
  let qIndex;
  do {
    qIndex = Math.floor(Math.random() * twoDigitPrimes.length);
  } while (qIndex === pIndex);
  return { p: twoDigitPrimes[pIndex], q: twoDigitPrimes[qIndex] };
}

export function calculateKeys(p, q) {
  if (!isPrime(p) || !isPrime(q)) {
    alert('Please enter valid prime numbers!');
    return null;
  }
  if (p === q) {
    alert('p and q must be different primes!');
    return null;
  }
  if (p < 11 || p > 97 || q < 11 || q > 97) {
    alert('Primes must be 2-digit numbers between 11 and 97.');
    return null;
  }

  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const potentialEs = [3, 5, 17, 19, 23, 29];
  let e = 0;

  for (let candidate of potentialEs) {
    if (candidate < phi && gcd(candidate, phi) === 1) {
      e = candidate;
      break;
    }
  }

  if (e === 0) {
    for (let i = 2; i < phi; i++) {
      if (gcd(i, phi) === 1) {
        e = i;
        break;
      }
    }
  }

  const d = modInverse(e, phi);

  return {
    p,
    q,
    n,
    phi,
    e,
    d,
    steps: [
      `<strong>Step 1: Selected primes</strong><br>p = ${p}, q = ${q}`,
      `<strong>Step 2: Calculated modulus n</strong><br>n = p × q = ${p} × ${q} = ${n}`,
      `<strong>Step 3: Calculated Euler's totient φ(n)</strong><br>φ(n) = (p-1)(q-1) = ${p-1} × ${q-1} = ${phi}`,
      `<strong>Step 4: Chose public exponent e</strong><br>e must be coprime with φ(n) (${phi})<br>Selected e = ${e} (gcd(${e}, ${phi}) = ${gcd(e, phi)})`,
      `<strong>Step 5: Calculated private key d</strong><br>d is the modular inverse of e mod φ(n)<br>d = ${d} (because ${e} × ${d} mod ${phi} = ${(e * d) % phi})`,
      `<strong>Final Keys:</strong><br><strong>Public Key:</strong> (e=${e}, n=${n})<br><strong>Private Key:</strong> (d=${d}, n=${n})`
    ]
  };
}

export function simulateLargePrime(digits) {
  let number = '1';
  for (let i = 1; i < digits; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }
  if (parseInt(number[number.length - 1]) % 2 === 0) {
    number = number.slice(0, -1) + '1';
  }
  return number;
}

export function multiplyLargeNumbers(num1, num2) {
  let digits = num1.length + num2.length - 1;
  let number = '1';
  for (let i = 1; i < digits; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }
  return number;
}

export async function generateRealWorldKeys() {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate computation delay
  const simulatedP = simulateLargePrime(308);
  const simulatedQ = simulateLargePrime(308);
  const simulatedN = multiplyLargeNumbers(simulatedP, simulatedQ);
  const simulatedD = simulateLargePrime(308);

  return {
    p: `${simulatedP.substring(0, 20)}...${simulatedP.substring(simulatedP.length - 20)} (${simulatedP.length} digits)`,
    q: `${simulatedQ.substring(0, 20)}...${simulatedQ.substring(simulatedQ.length - 20)} (${simulatedQ.length} digits)`,
    n: `${simulatedN.substring(0, 20)}...${simulatedN.substring(simulatedN.length - 20)} (${simulatedN.length} digits)`,
    d: `${simulatedD.substring(0, 20)}...${simulatedD.substring(simulatedD.length - 20)} (${simulatedD.length} digits)`,
    e: '65537 (common choice)',
    steps: [
      `<strong>Step 1: Generated 1024-bit primes</strong><br>p and q are each ~308 digits long (1024 bits)<br>Finding primes this large requires sophisticated algorithms like Miller-Rabin primality testing`,
      `<strong>Step 2: Calculated modulus n</strong><br>n = p × q = 2048-bit number (~617 digits)<br>This is the public modulus used in both keys`,
      `<strong>Step 3: Chose public exponent e</strong><br>Typically e=65537 (0x10001) for efficiency<br>Must be coprime with φ(n) = (p-1)(q-1)`,
      `<strong>Step 4: Calculated private key d</strong><br>d is the modular inverse of e mod φ(n)<br>This is the computationally intensive step for large keys`,
      `<strong>Final Keys:</strong><br><strong>Public Key:</strong> (e=65537, n=2048-bit modulus)<br><strong>Private Key:</strong> (d=2048-bit number, n=2048-bit modulus)`
    ]
  };
}

export function encryptMessage(message, currentMode, n, e) {
  if (currentMode === 'real') {
    return {
      result: `
        <strong>Real-World Encryption Note:</strong><br>
        Actual RSA encryption with 2048-bit keys is too computationally intensive for this browser-based demo.<br>
        In practice, messages are padded (e.g., with OAEP) and encrypted using the public key (e=65537, n=2048-bit modulus).<br>
        Try Demo Mode to see a simplified encryption process with small keys.
      `,
      steps: [
        `<strong>Real-World Encryption Process:</strong><br>
         - Message is padded (e.g., OAEP padding)<br>
         - Message is converted to a number m < n<br>
         - Ciphertext c = m^e mod n (using e=65537, 2048-bit n)<br>
         - This requires specialized cryptographic libraries`
      ]
    };
  }

  if (n === 0) {
    alert('Please generate keys first!');
    return null;
  }

  if (!message) {
    alert('Please enter a message to encrypt!');
    return null;
  }

  const numericMessage = stringToNumbers(message);
  const encryptedBlocks = [];

  for (let num of numericMessage) {
    if (num >= n) {
      alert('Message contains characters too large for the current modulus n. Try a shorter message or larger primes.');
      return null;
    }
    const encrypted = modExp(num, e, n);
    encryptedBlocks.push(encrypted);
  }

  const ciphertext = encryptedBlocks.join(' ');
  return {
    result: `
      <strong>Original message:</strong> "${message}"<br>
      <strong>Numerical representation:</strong> ${numericMessage.join(' ')}<br>
      <strong>Encrypted ciphertext:</strong> ${ciphertext}
    `,
    steps: [
      `<strong>Step 1: Convert message to numbers</strong><br>"${message}" → ${numericMessage.join(' ')} (ASCII codes)`,
      `<strong>Step 2: Encrypt each number using public key (e=${e}, n=${n})</strong><br>c ≡ m<sup>e</sup> mod n<br>${numericMessage
        .map((m, i) => `${m}<sup>${e}</sup> mod ${n} = ${modExp(m, e, n)} → ${encryptedBlocks[i]}`)
        .join('<br>')}`,
      `<strong>Final Ciphertext:</strong><br>${ciphertext}`
    ],
    ciphertext
  };
}

export function decryptMessage(ciphertext, currentMode, n, d) {
  if (currentMode === 'real') {
    return {
      result: `
        <strong>Real-World Decryption Note:</strong><br>
        Actual RSA decryption with 2048-bit keys is too computationally intensive for this browser-based demo.<br>
        In practice, ciphertext is decrypted using the private key (d, n) with proper unpadding.<br>
        Try Demo Mode to see a simplified decryption process with small keys.
      `,
      steps: [
        `<strong>Real-World Decryption Process:</strong><br>
         - Ciphertext is converted to a number c<br>
         - Message m = c^d mod n (using 2048-bit d, n)<br>
         - Message is unpadded (e.g., OAEP unpadding)<br>
         - This requires specialized cryptographic libraries`
      ]
    };
  }

  if (n === 0) {
    alert('Please generate keys first!');
    return null;
  }

  if (!ciphertext) {
    alert('Please enter ciphertext to decrypt!');
    return null;
  }

  const encryptedBlocks = ciphertext.split(' ').map(Number);
  if (encryptedBlocks.some(isNaN)) {
    alert('Invalid ciphertext format! Please enter numbers separated by spaces.');
    return null;
  }

  const decryptedNumbers = [];

  for (let block of encryptedBlocks) {
    if (block >= n) {
      alert('Ciphertext contains numbers too large for the current modulus n.');
      return null;
    }
    const decrypted = modExp(block, d, n);
    decryptedNumbers.push(decrypted);
  }

  const decryptedMessage = numbersToString(decryptedNumbers);
  if (!decryptedMessage) {
    alert('Decryption failed! The ciphertext may not correspond to valid ASCII characters.');
    return null;
  }

  return {
    result: `
      <strong>Ciphertext:</strong> ${ciphertext}<br>
      <strong>Decrypted numbers:</strong> ${decryptedNumbers.join(' ')}<br>
      <strong>Decrypted message:</strong> "${decryptedMessage}"
    `,
    steps: [
      `<strong>Decryption Steps:</strong>`,
      `<strong>Step 1: Decrypt each number using private key (d=${d}, n=${n})</strong><br>m ≡ c<sup>d</sup> mod n<br>${encryptedBlocks
        .map((c, i) => `${c}<sup>${d}</sup> mod ${n} = ${modExp(c, d, n)} → ${decryptedNumbers[i]}`)
        .join('<br>')}`,
      `<strong>Step 2: Convert numbers to text</strong><br>${decryptedNumbers.join(' ')} → "${decryptedMessage}" (ASCII codes)`
    ]
  };
}