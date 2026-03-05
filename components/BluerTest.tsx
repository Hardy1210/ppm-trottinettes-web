// BlurTest.tsx
export function BlurTest() {
  return (
    <div
      style={{
        height: '200vh',
        background: 'linear-gradient(135deg, #e66, #36f, #3f9)',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
        }}
      >
        {/* capa blur */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        />

        {/* contenido */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '18px 28px',
            color: 'white',
          }}
        >
          Nav content aquí
        </div>
      </div>

      <p
        style={{
          paddingTop: 120,
          paddingLeft: 40,
          fontSize: 40,
          color: 'white',
        }}
      >
        Scroll para ver el blur
      </p>
    </div>
  );
}
