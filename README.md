# Hunterdoge
Hunterdoge Project Documentation
1. HunterdogeAPP-master – Hauptanwendung
**Ordnerstruktur:**
- `server/`
- `public/`
- `src/`

#### Wichtige Dateien im Ordner `server`
- **`server/index.js`** – Dies ist der Haupteinstiegspunkt für das Backend der Anwendung und initialisiert den Server:
  ```javascript
  const express = require('express');
  const app = express();
  app.get('/', (req, res) => res.send('Welcome to Hunterdoge Server'));
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  ```

Diese Datei startet den Express-Server auf Port 3000 und richtet eine einfache API ein, die als Backend für das Frontend dient und mit der Blockchain kommuniziert.

#### Dateien im Ordner `public`
- **`index.html`** – Diese HTML-Datei ist das grundlegende Gerüst für die React-App, die die Benutzeroberfläche von Hunterdoge bildet. Der Inhalt wird dynamisch durch React-Komponenten in `src` ergänzt.

#### Dateien im Ordner `src`
Der Ordner `src` ist in logische Bereiche gegliedert und enthält den gesamten Quellcode für das Frontend.

- **`pages/HomePage.jsx`** – Die `HomePage`-Komponente zeigt die wichtigsten Token- und Presale-Informationen an und passt das Layout für mobile Geräte an:
  ```javascript
  import PromotedPreSales from '../components/promotedPresales';
  import PopularTokens from '../components/popularTokens';
  import QuickFilter from '../components/quickFilter';

  const HomePage = () => {
      return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <PromotedPreSales />
              <PopularTokens />
              <QuickFilter />
          </Box>
      );
  };
  ```

Diese Komponente zeigt unter anderem die geförderten Vorverkäufe (`PromotedPreSales`) und populäre Token (`PopularTokens`) an und enthält einen Schnellfilter.

- **`components/tokenInformationHeader/TokenHeader.jsx`** – Diese Komponente zeigt detaillierte Informationen über ein Token, wie Preis, Marktkapitalisierung und Netzwerkdetails:
  ```javascript
  const TokenHeader = ({ tokenData = {} }) => {
      return (
          <Wrapper>
              <HeadTitle size={'42px'}>{tokenData.Project_Symbol}</HeadTitle>
              <Button onClick={() => window.open(tokenData.Project_Website, '_blank')}>Visit Website</Button>
              <Text size={'24px'}>{tokenData.Project_Name}</Text>
              <Text>Market Cap: ${NumberFormatter(tokenData.Project_MarketCap)}</Text>
          </Wrapper>
      );
  };
  ```

Hier wird der Token-Preis, die Website und Marktdaten für ein spezifisches Token angezeigt.
2. HunterDogeContent-main – Inhalts-Assets
Dieser Ordner speichert die Medienressourcen und die statischen Inhalte, die auf der Webseite von Hunterdoge angezeigt werden, einschließlich `images`, `icons`, und `Emojis`. Diese Dateien werden in verschiedenen Komponenten und Seiten des Frontends geladen und angezeigt.

Beispiel:
- **`content/Normal contents/Book.png`** – Symbolbilder für verschiedene Token-Kategorien.

3. HunterdogeNFT-main – NFTs und Swap-Funktionalität
Dieser Bereich des Projekts bezieht sich auf die NFTs, die Hunterdoge anbietet, und beinhaltet eine spezielle Swap-Funktion, die den Handel von NFTs und Token ermöglicht.

- **`src/swap/swap.js`** – Definiert die Logik für den Token-Tausch:
  ```javascript
  const SwapComponent = () => {
      const [fromToken, setFromToken] = useState(null);
      const [toToken, setToToken] = useState(null);

      const handleSwap = async () => {
          // Logik für den Tausch zwischen `fromToken` und `toToken`
          console.log(`Swapping ${fromToken} for ${toToken}`);
      };

      return <Button onClick={handleSwap}>Swap Now</Button>;
  };
  ```

Diese Datei enthält die Tauschlogik und erlaubt Benutzern, Tokens zu tauschen.
4. HunterDogeServer-master – Server und Blockchain-Interaktion
Dieser Ordner umfasst die Backend-Logik und die Smart Contract-APIs für die Blockchain-Interaktion. Der Server kommuniziert direkt mit der Blockchain und nutzt `Web3` zur Verwaltung von Smart Contract-Aufrufen.

- **`contracts/ABIMAIN.json`** – Die ABI-Datei (Application Binary Interface) für den Haupt-Token-Contract:
  ```json
  [
      {
          "inputs": [{"internalType": "address", "name": "_account", "type": "address"}],
          "name": "airdropVotes",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "getAllMembers",
          "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
          "stateMutability": "view",
          "type": "function"
      }
  ]
  ```

Diese ABI definiert Funktionen wie `airdropVotes`, um Stimmrechte an bestimmte Adressen zu vergeben, und `getAllMembers`, um eine Liste aller Token-Inhaber abzurufen. Dies ist wichtig für den Server, um Informationen über Token-Inhaber und ihre Stimmrechte von der Blockchain abzurufen und an das Frontend zu senden.

![image](https://github.com/user-attachments/assets/ea051815-de25-4f17-a88d-4ac7b000b4d7)
