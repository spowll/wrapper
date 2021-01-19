#pragma once

#include <math.h>
#include <stdint.h>
#include <stdlib.h> // for malloc
#include <emscripten.h> // for EMSCRIPTEN_KEEPALIVE

#define EXPORT_JS /* avoid C++ mangling */ extern "C" /* export and don't inline */ EMSCRIPTEN_KEEPALIVE
#define assert(...) do {} while(false)
#ifdef _MSC_VER
#define FORCEINLINE __forceinline
#else
#define FORCEINLINE __attribute__((always_inline)) inline
#endif

constexpr double PId = 3.1415;
constexpr float PIf = 3.1415f;
constexpr auto PI = PIf;
FORCEINLINE constexpr float DEG2RADf(float deg) { return deg * PIf / 180.f; }
FORCEINLINE constexpr float RAD2DEGf(float rad) { return rad * 180.f / PIf; }
FORCEINLINE constexpr double DEG2RADd(double deg) { return deg * PId / 180.; }
FORCEINLINE constexpr double RAD2DEGd(double rad) { return rad * 180. / PId; }
template<typename T> FORCEINLINE void sincos(T val, T& sin_out, T& cos_out) {
	sin_out = sin(val);
	cos_out = cos(val);
}
template<typename T = void, typename X = T> FORCEINLINE T* GetPointer(X* base, int64_t offset) {
	return (T*)(((int8_t*)base) + offset);
}

#define VECTOR_NO_SLOW_OPERATIONS
#include "lz4.h"
#include "Vector.h"
#include "vhcg.h"
#include "vmatrix.h"
#include "crc32.h"
