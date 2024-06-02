import Ruler from "./components/Ruler";
// import SVGComponent from "./components/SVGComponent";

function App() {
  return (
    <>
      <Ruler
        min={0}
        max={5}
        stepLarge={1}
        stepSmall={0.5}
        y1={120}
        y2={620}
        waterLevel={5}
        scale={1}
      />
    </>
  );
}

export default App;
