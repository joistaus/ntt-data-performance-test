# NTT Data Performance Test

Proyecto de pruebas de carga desarrollado con k6 para evaluar el rendimiento del endpoint de login de la API FakeStore bajo condiciones de alto tráfico.

## Estructura del proyecto

```
ntt-data-performance-test/
├── src/
│   ├── config/
│   │   ├── constants.js        — constantes reutilizables (URL, thresholds, headers)
│   │   └── reporter.js         — configuración del reporte HTML
│   ├── data/
│   │   └── users.csv           — credenciales de prueba
│   ├── helpers/
│   │   ├── checks.js           — validaciones por petición
│   │   └── users.js            — carga del CSV con SharedArray
│   └── test/
│       └── login-test.js       — script principal de la prueba
├── .gitignore
└── README.md
```

## Herramientas

- k6 v1.7.1

## Ejecución

```bash
k6 run src/test/login-test.js
```

## Thresholds

| Métrica | Condición | Resultado esperado |
|---|---|---|
| Tiempo de respuesta p(95) | < 1500 ms | PASS |
| Tasa de error | < 3% | PASS |

## Reporte

Al finalizar la prueba se genera automáticamente el archivo `summary.html` en la raíz del proyecto con el resumen visual de los resultados.
