import styled from 'styled-components'

const NavbarFrame = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  gap: 50%;
  width: 100%;
  background-color: #00021a;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  z-index: 1000;

  ul {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`

const NavbarButtons = styled.ul`
  background-color: #00021a;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavbarButton = styled.button`
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: calc(1.2vw);

  transition: color 0.3s, background-color 0.3s;
  background-image: linear-gradient(120deg, transparent 0%, transparent 50%, #ce9eff 50%, #ce9eff 100%);
  -webkit-background-clip: text;
  background-clip: text;

  &:hover {
    color: #ce9eff;
    background-position: 100%; /* Move gradient position when hovering */
  }
`

const NameLogo = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: calc(1.7vw);
  color: #fff;
`

function Navbar() {
  const goTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <NavbarFrame>
      <NameLogo>Kevin Kim &lt;/&gt;</NameLogo>
      <NavbarButtons>
        <li><NavbarButton onClick={() => goTo('home')}>Home</NavbarButton></li>
        <li><NavbarButton onClick={() => goTo('about')}>About</NavbarButton></li>
        <li><NavbarButton onClick={() => goTo('projects')}>Projects</NavbarButton></li>
        <li><NavbarButton onClick={() => goTo('contact')}>Contact</NavbarButton></li>
      </NavbarButtons>
    </NavbarFrame>
  );
}


export default Navbar