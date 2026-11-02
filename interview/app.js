(function () {
  'use strict';

  var SOURCES = {
    network: [
      ['WeareSoft · Network', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/network.md'],
      ['gyoogle · Network', 'https://github.com/gyoogle/tech-interview-for-developer/tree/master/Computer%20Science/Network']
    ],
    os: [
      ['WeareSoft · OS', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/os.md'],
      ['gyoogle · OS', 'https://github.com/gyoogle/tech-interview-for-developer/tree/master/Computer%20Science/Operating%20System']
    ],
    db: [
      ['WeareSoft · DB', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/db.md'],
      ['gyoogle · Database', 'https://github.com/gyoogle/tech-interview-for-developer/tree/master/Computer%20Science/Database']
    ],
    security: [
      ['WeareSoft · Security', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/security.md'],
      ['OWASP Cheat Sheets', 'https://cheatsheetseries.owasp.org/']
    ],
    java: [
      ['WeareSoft · Java', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/java.md'],
      ['WeareSoft · Spring', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/spring.md'],
      ['gyoogle · Java', 'https://github.com/gyoogle/tech-interview-for-developer/tree/master/Language/Java']
    ],
    algorithm: [
      ['WeareSoft · Data Structure', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/datastructure.md'],
      ['WeareSoft · Algorithm', 'https://github.com/WeareSoft/tech-interview/blob/master/contents/algorithm.md'],
      ['gyoogle · Algorithm', 'https://github.com/gyoogle/tech-interview-for-developer/tree/master/Algorithm']
    ],
    ai: [
      ['Google ML · Rules of ML', 'https://developers.google.com/machine-learning/guides/rules-of-ml'],
      ['NIST · AI RMF', 'https://www.nist.gov/itl/ai-risk-management-framework']
    ],
    sw: [
      ['gyoogle · SW Engineering', 'https://github.com/gyoogle/tech-interview-for-developer/tree/master/Computer%20Science/Software%20Engineering'],
      ['gyoogle · C', 'https://github.com/gyoogle/tech-interview-for-developer/tree/master/Language/C']
    ]
  };

  var CATEGORIES = [
    ['all', '전체'], ['network', '네트워크'], ['os', '운영체제'], ['db', '데이터베이스'],
    ['security', '보안'], ['java', 'Java · Spring'], ['algorithm', '자료구조 · 알고리즘'],
    ['ai', 'AI · 스마트팩토리'], ['sw', 'C · SW공학']
  ];

  var TOPICS = [
    {
      id: 'osi', cat: 'network', title: 'OSI 7계층과 캡슐화를 설명해 보세요.',
      overview: 'OSI는 통신 기능을 역할별로 분리한 참조 모델입니다. 장애 지점을 계층별로 좁히고, 서로 다른 장비와 프로토콜을 공통 언어로 설명하는 데 유용합니다.',
      principle: '송신 측은 응용 데이터에 TCP/UDP 헤더, IP 헤더, Ethernet 헤더·트레일러를 차례로 붙입니다. 수신 측은 역순으로 제거합니다. 실제 인터넷 구현은 보통 TCP/IP 계층 모델로 설명하지만, 문제를 분해할 때 OSI 7계층이 편리합니다.',
      diagram: 'Application  HTTP / DNS / SCADA data\n      ↓ data\nTransport    TCP/UDP + port  → segment/datagram\n      ↓\nNetwork      IP + address    → packet\n      ↓\nData Link    MAC + FCS       → frame\n      ↓\nPhysical     bits / signal',
      answer: 'OSI 7계층은 네트워크 통신을 물리부터 응용까지 역할별로 나눈 참조 모델입니다. 송신 시 상위 데이터에 포트, IP, MAC 정보가 순서대로 붙는 캡슐화가 일어나고 수신 시 역캡슐화됩니다. 실무에서는 예를 들어 링크는 정상인데 서비스가 안 되면 L2, L3, L4, 애플리케이션 순으로 범위를 좁혀 장애를 진단하는 공통 프레임으로 활용합니다.',
      followups: ['스위치와 라우터는 주로 어느 계층에서 동작하나요?', 'PDU 이름이 계층마다 다른 이유는 무엇인가요?', 'L7 로드밸런서와 L4 로드밸런서의 판단 정보는 어떻게 다른가요?'],
      experience: 'K-water SCADA/NAC 또는 해군 망 장애 사례를 말할 때 “물리 링크 → VLAN/MAC → IP/라우팅 → 포트 → 서비스” 순서로 확인했다는 진단 프레임에 연결하세요. 실제로 확인하지 않은 단계는 덧붙이지 않습니다.',
      quiz: ['라우터가 기본적으로 전달 결정을 내릴 때 가장 직접적으로 보는 정보는?', ['목적지 IP 주소', '목적지 MAC 주소만', 'HTTP 메서드', '프로세스 ID'], 0, '라우터의 기본 전달 결정은 네트워크 계층의 목적지 IP와 라우팅 테이블을 기준으로 합니다. 다음 홉 전달 과정에서는 링크 계층 주소도 사용합니다.']
    },
    {
      id: 'tcp-udp-socket', cat: 'network', title: 'TCP와 UDP, 소켓의 차이를 설명해 보세요.',
      overview: 'TCP와 UDP는 모두 전송 계층 프로토콜이지만 보장과 비용이 다릅니다. 소켓은 애플리케이션이 운영체제의 네트워크 기능을 사용하는 프로그래밍 인터페이스입니다.',
      principle: 'TCP는 연결 상태, 순서, 재전송, 흐름·혼잡 제어를 제공합니다. UDP는 독립적인 데이터그램을 보내며 전달·순서·중복 제거를 보장하지 않습니다. “UDP는 항상 빠르다”가 아니라, 필요한 보장을 애플리케이션이 어떻게 구현하느냐까지 비교해야 합니다.',
      diagram: 'TCP socket: (src IP, src port, dst IP, dst port)\napp → stream → TCP reliability → IP\n\nUDP socket: local IP/port 중심\napp → datagram boundaries kept → IP',
      answer: 'TCP는 연결을 맺고 바이트 스트림의 순서와 재전송, 흐름·혼잡 제어를 제공해 신뢰성이 필요한 전송에 적합합니다. UDP는 연결 설정과 이런 보장이 없어 헤더와 지연 부담이 작지만, 손실 대응은 애플리케이션 몫입니다. 소켓은 둘 중 하나를 사용하는 운영체제 API이며, TCP 연결은 보통 출발지와 목적지의 IP·포트 4개 값으로 구분합니다. 따라서 파일 전송에는 TCP, 실시간성이 중요한 일부 스트리밍·제어에는 UDP를 검토합니다.',
      followups: ['UDP 위에서도 신뢰성을 구현할 수 있나요?', 'TCP가 메시지 경계를 보존하지 않는다는 뜻은?', 'TIME_WAIT가 필요한 이유는 무엇인가요?'],
      experience: 'SCADA나 망 운영 사례에서는 프로토콜 선택보다 “손실 허용도·지연 요구·재전송 시 위험”을 먼저 제시하세요. TelcoNet Sentinel에서는 BFD가 짧은 주기의 제어 패킷으로 장애 감지를 빠르게 한다는 점과 연결할 수 있습니다.',
      quiz: ['TCP 수신 측 read() 한 번이 송신 측 write() 한 번과 정확히 대응하나요?', ['항상 대응한다', '대응하지 않을 수 있다', 'TLS에서만 대응한다'], 1, 'TCP는 메시지가 아니라 바이트 스트림을 제공합니다. 애플리케이션은 길이 필드, 구분자 등으로 프레이밍해야 합니다.']
    },
    {
      id: 'handshake', cat: 'network', title: 'TCP 3-way·4-way handshake를 설명해 보세요.',
      overview: '3-way handshake는 양방향 송수신 가능성과 초기 시퀀스 번호를 확인해 연결 상태를 만듭니다. 종료는 각 방향을 독립적으로 닫을 수 있어 보통 4개 세그먼트가 오갑니다.',
      principle: '연결은 SYN → SYN/ACK → ACK입니다. 종료는 한쪽의 FIN → ACK 후 반대쪽도 FIN → ACK를 보냅니다. ACK와 FIN이 합쳐지면 패킷 수는 달라질 수 있으므로 “항상 정확히 4개”라고 단정하지 않습니다. 능동 종료 측 TIME_WAIT는 지연된 세그먼트가 새 연결을 오염시키지 않게 합니다.',
      diagram: 'Client                         Server\n  SYN, seq=x      ─────────────→\n                  ←──── SYN+ACK, seq=y, ack=x+1\n  ACK, ack=y+1    ─────────────→  ESTABLISHED\n\n  FIN ─→ ACK     … half-close …     FIN ← ACK',
      answer: 'TCP 연결 시 클라이언트가 SYN, 서버가 SYN과 ACK, 클라이언트가 ACK를 보내 서로의 송수신 가능성과 초기 시퀀스 번호를 확인합니다. 종료는 양방향 스트림을 각각 닫기 때문에 보통 FIN과 ACK가 두 방향에서 오가며, 구현과 타이밍에 따라 FIN·ACK가 합쳐질 수 있습니다. 능동 종료 측은 TIME_WAIT 동안 남아 지연된 패킷을 흡수하고 마지막 ACK 유실 시 재전송에 대응합니다.',
      followups: ['2-way handshake로 부족한 이유는?', 'SYN flood는 어떤 자원을 노리나요?', 'RST와 FIN의 의미 차이는?'],
      experience: '장애 진단에서 SYN은 나가지만 SYN/ACK가 안 오는지, 연결은 됐지만 응용 응답이 없는지를 구분하면 방화벽·경로·서비스 문제를 좁힐 수 있습니다. 실제 패킷 캡처를 사용한 경험이 있을 때만 도구명과 관측값을 덧붙이세요.',
      quiz: ['TIME_WAIT 상태가 주로 존재하는 쪽은?', ['수동 종료 측만', '능동 종료 측', '항상 서버'], 1, '마지막 ACK를 보내는 능동 종료 측이 일반적으로 TIME_WAIT에 들어갑니다. 역할은 클라이언트·서버와 고정되지 않습니다.']
    },
    {
      id: 'dns-http-tls', cat: 'network', title: 'URL 입력 후 DNS·HTTP·TLS 흐름을 설명해 보세요.',
      overview: '브라우저가 URL을 처리하는 과정은 이름 해석, 경로 선택과 연결, 보안 채널 수립, HTTP 요청, 렌더링으로 이어집니다. 캐시와 HTTP 버전에 따라 세부 왕복 횟수는 달라집니다.',
      principle: 'DNS는 이름을 IP 등 레코드로 해석합니다. HTTPS라면 TCP 또는 QUIC 연결 위에서 TLS가 서버 인증서 검증과 키 합의를 수행해 세션 키를 만들고, 이후 HTTP 메시지를 보호합니다. TLS는 서버가 안전하다는 보증이 아니라 인증서의 이름·유효기간·신뢰 체인 등을 확인해 해당 키의 소유를 검증합니다.',
      diagram: 'URL parse\n  ↓ DNS cache → resolver → authoritative DNS\nIP selected\n  ↓ TCP+TLS (HTTP/1.1, 2) or QUIC+TLS (HTTP/3)\nHTTP request → response → parse/render',
      answer: 'URL을 입력하면 브라우저는 먼저 캐시와 DNS 리졸버를 통해 도메인을 IP로 해석합니다. 이후 HTTP/1.1이나 2라면 보통 TCP 연결을 만들고 TLS에서 인증서와 호스트명을 검증하며 키 합의로 대칭키를 만듭니다. HTTP/3는 QUIC 위에서 이 과정을 통합합니다. 안전한 채널이 생기면 HTTP 요청을 보내고 응답의 HTML과 추가 자원을 받아 렌더링합니다. 실제 왕복 수는 캐시, 연결 재사용, 프로토콜 버전에 따라 달라집니다.',
      followups: ['재귀 DNS와 권한 DNS의 역할은?', 'TLS에서 대칭키와 비대칭키를 함께 쓰는 이유는?', 'HTTP/2와 HTTP/3의 head-of-line blocking 차이는?'],
      experience: '망 장애에서 “DNS 해석 실패인지, 연결 실패인지, 인증서 검증 실패인지, 응용 오류인지”를 분리해 설명하세요. K-water/NAC 경험은 인증 후 이름 해석·접근 경로가 달라지는 상황을 실제 사실 범위에서 연결할 수 있습니다.',
      quiz: ['HTTPS에서 대용량 본문을 주로 암호화하는 키는?', ['세션용 대칭키', '서버 공개키만', 'DNSSEC 키'], 0, '비대칭 암호는 인증과 키 합의에 활용하고, 실제 데이터는 효율적인 대칭키로 보호하는 것이 일반적입니다.']
    },
    {
      id: 'routing-ospf-bfd', cat: 'network', title: '라우팅과 OSPF·BFD의 역할을 설명해 보세요.',
      overview: '라우팅은 목적지 네트워크로 보낼 다음 홉과 인터페이스를 선택하는 과정입니다. OSPF는 경로를 계산하고, BFD는 이웃 경로의 전달 가능성 상실을 빠르게 감지하도록 보조합니다.',
      principle: 'OSPF는 링크 상태 정보를 영역 내에 전파하고 SPF 알고리즘으로 비용이 낮은 경로를 계산합니다. BFD는 라우팅 프로토콜과 분리된 빠른 생존 확인 메커니즘입니다. BFD가 새 경로를 계산하는 것은 아니며, 실패 신호를 OSPF 등에 알려 수렴을 앞당깁니다. 너무 공격적인 타이머는 부하와 오탐 가능성을 키웁니다.',
      diagram: 'R1 ── R2 ── R4\n └── R3 ──┘\n\nBFD: forwarding failure detect\n  ↓ notify\nOSPF: LSA / SPF recalculate\n  ↓\nFIB: next-hop changed',
      answer: '라우팅은 목적지 IP에 대해 가장 구체적인 경로를 찾아 다음 홉으로 전달하는 과정입니다. OSPF는 링크 상태를 공유하고 비용을 기준으로 SPF 계산을 해 내부망 경로를 만듭니다. BFD는 매우 짧은 주기로 전달 경로의 생존 여부를 확인해 실패를 빠르게 알리지만 경로 자체를 계산하지는 않습니다. 따라서 OSPF와 연동하면 장애 감지 시간을 줄일 수 있고, 타이머는 장비 부하와 오탐 위험을 고려해 정해야 합니다.',
      followups: ['Longest Prefix Match란?', 'OSPF area를 나누는 이유는?', '링크는 up인데 패킷만 버려지는 장애를 어떻게 탐지하나요?'],
      experience: 'TelcoNet Sentinel에서 FRRouting 기반 OSPF 단독과 BFD 연동의 탐지·경로 전환을 반복 계측한 경험을 직접 연결하세요. 공개 포트폴리오의 수치는 로컬 랩 관측 상한임을 함께 밝혀 과장하지 않습니다.',
      quiz: ['BFD의 핵심 역할은?', ['최단 경로 계산', '빠른 전달 경로 장애 감지', 'IP 주소 할당', '패킷 암호화'], 1, 'BFD는 빠른 장애 감지를 제공하고, 라우팅 프로토콜이 그 신호를 받아 경로를 다시 계산하게 합니다.']
    },
    {
      id: 'process-thread', cat: 'os', title: '프로세스와 스레드의 차이를 설명해 보세요.',
      overview: '프로세스는 실행 중인 프로그램의 자원 보호 단위이고, 스레드는 그 프로세스 안의 실행 흐름입니다. 스레드는 주소 공간을 공유하지만 각자의 스택과 레지스터 문맥을 가집니다.',
      principle: '프로세스 간 격리는 장애 전파를 줄이지만 IPC 비용이 듭니다. 같은 프로세스의 스레드는 코드·힙·열린 파일 등을 공유해 통신이 쉽지만, 경쟁 상태와 한 스레드의 치명적 오류가 프로세스 전체에 미치는 위험이 있습니다. 문맥 전환 비용은 일반적으로 프로세스가 더 크지만 OS와 워크로드에 따라 달라집니다.',
      diagram: 'Process A address space\n ├─ code / heap / files  ← shared\n ├─ Thread 1: PC, registers, stack\n └─ Thread 2: PC, registers, stack\n\nProcess B: separate virtual address space',
      answer: '프로세스는 독립된 가상 주소 공간과 자원을 가진 실행 단위이고, 스레드는 프로세스 내부의 실행 단위입니다. 같은 프로세스의 스레드는 힙과 코드, 파일을 공유하지만 스택과 레지스터는 각각 가집니다. 그래서 스레드는 데이터 공유와 생성 비용 측면에서 유리한 반면 동기화가 필요하고 오류가 프로세스 전체로 퍼질 수 있습니다. 격리가 중요하면 프로세스, 공유와 낮은 지연이 중요하면 스레드를 우선 검토합니다.',
      followups: ['멀티스레드가 항상 빠르지 않은 이유는?', 'IPC 방식에는 무엇이 있나요?', '코루틴과 OS 스레드의 차이는?'],
      experience: 'SCADA·망 운영 시스템을 설명할 때 수집기, 분석기, UI를 프로세스로 격리할지 스레드로 공유할지의 선택 기준으로 연결할 수 있습니다. 실제 설계 경험이 없다면 가상 개선안으로 명확히 구분하세요.',
      quiz: ['같은 프로세스의 스레드끼리 일반적으로 공유하지 않는 것은?', ['힙', '코드', '각 스레드의 스택', '열린 파일 테이블'], 2, '각 스레드는 독립적인 호출 흐름을 위해 스택과 레지스터 문맥을 별도로 가집니다.']
    },
    {
      id: 'mutex-semaphore', cat: 'os', title: '뮤텍스와 세마포어의 차이는 무엇인가요?',
      overview: '둘 다 동시 접근을 조정하지만 의미가 다릅니다. 뮤텍스는 한 소유자의 상호 배제, 세마포어는 사용 가능한 허가 개수를 관리하는 동기화 도구로 보는 것이 핵심입니다.',
      principle: '뮤텍스는 보통 lock을 획득한 스레드가 unlock해야 하는 소유권 의미가 있습니다. 카운팅 세마포어는 N개 자원 접근을 허용하고 wait가 카운트를 줄이며 signal이 늘립니다. 이진 세마포어는 값이 0/1이지만 소유권 규칙이 뮤텍스와 다를 수 있습니다. 조건변수는 특정 상태 변화까지 기다리는 데 사용합니다.',
      diagram: 'Mutex:       [critical section] ← owner 1 only\nSemaphore(3): [● ● ●] → acquire → [● ● ○]\nCondition:    wait(predicate) ← signal on state change',
      answer: '뮤텍스는 임계영역에 한 실행 흐름만 들어가도록 하는 상호 배제 도구이며, 일반적으로 잠근 스레드가 해제한다는 소유권이 있습니다. 세마포어는 카운터로 사용 가능한 자원 수를 표현해 N개의 동시 접근을 허용하거나 이벤트를 알릴 수 있습니다. 따라서 공유 자료구조 보호에는 뮤텍스, 크기 10인 연결 풀 제한에는 카운팅 세마포어처럼 목적에 따라 선택합니다.',
      followups: ['spin lock은 언제 유리할 수 있나요?', '조건변수 wait는 왜 반복문에서 검사하나요?', '락 범위를 작게 잡아야 하는 이유는?'],
      experience: 'ConsentLedger의 비관적 락은 데이터베이스 동시성 제어 사례입니다. OS 뮤텍스와 동일하다고 말하지 말고, “공유 상태의 경쟁을 제어한다는 목적은 같지만 계층과 메커니즘이 다르다”고 연결하세요.',
      quiz: ['동시에 5개 작업만 외부 장비에 접근하게 제한하는 데 자연스러운 도구는?', ['카운팅 세마포어', '무조건 spin lock', '페이지 테이블'], 0, '허가 수를 5로 둔 카운팅 세마포어가 제한된 동일 자원의 동시 사용을 표현하기 적합합니다.']
    },
    {
      id: 'deadlock', cat: 'os', title: '데드락의 조건과 해결 방법을 설명해 보세요.',
      overview: '데드락은 여러 실행 흐름이 서로가 가진 자원을 기다리며 영원히 진행하지 못하는 상태입니다. 네 가지 필요조건 중 하나를 깨면 예방할 수 있습니다.',
      principle: '상호 배제, 점유 대기, 비선점, 순환 대기가 동시에 성립해야 합니다. 예방은 락 순서 통일 등으로 조건을 깨고, 회피는 안전 상태를 판단하며, 탐지·복구는 발생 후 희생 작업을 종료하거나 자원을 회수합니다. timeout은 영원한 대기를 막지만 일관성 복구 설계가 함께 필요합니다.',
      diagram: 'T1 holds A ── waits B\n      ↑              │\n      │              ↓\nT2 waits A ─── holds B   → cycle / no progress',
      answer: '데드락은 작업들이 서로 점유한 자원을 기다려 진행하지 못하는 상태입니다. 상호 배제, 점유 대기, 비선점, 순환 대기의 네 조건이 동시에 필요합니다. 실무에서는 모든 코드가 락을 같은 순서로 획득하게 해 순환 대기를 깨고, 락 범위를 줄이며 timeout과 모니터링을 둡니다. 데이터베이스가 데드락을 탐지해 한 트랜잭션을 중단하면 애플리케이션은 멱등성을 고려해 재시도해야 합니다.',
      followups: ['데드락과 livelock, starvation의 차이는?', '은행원 알고리즘은 무엇을 판단하나요?', 'DB 재시도에 backoff가 필요한 이유는?'],
      experience: 'ConsentLedger처럼 동시 변경과 감사 무결성이 중요한 시스템을 예로 들 수 있습니다. 실제로 데드락을 해결한 경험이 아니라면 “비관적 락 사용 시 고려한 위험”으로 표현하세요.',
      quiz: ['모든 스레드가 락을 A→B 순서로만 획득하게 하면 주로 깨지는 조건은?', ['상호 배제', '순환 대기', '비선점', '점유 대기'], 1, '전역 락 순서를 정하면 자원 대기 그래프에 순환이 생기는 것을 방지할 수 있습니다.']
    },
    {
      id: 'scheduling', cat: 'os', title: 'CPU 스케줄링 알고리즘과 평가 기준을 설명해 보세요.',
      overview: '스케줄러는 준비된 작업 중 다음 CPU 사용자를 선택합니다. 평균 대기시간뿐 아니라 응답시간, 처리량, 공정성, deadline 등 워크로드 목표가 중요합니다.',
      principle: 'FCFS는 단순하지만 convoy effect가 있고, SJF/SRTF는 짧은 작업에 유리하나 실행시간 예측과 기아 문제가 있습니다. Round Robin은 time quantum으로 응답성을 높이지만 너무 작으면 문맥 전환 비용이 커집니다. 우선순위 방식은 priority inversion에 대비해 priority inheritance 등을 고려합니다.',
      diagram: 'Ready queue [P1 P2 P3] → scheduler → CPU\nRR(q=2): P1 P1 | P2 P2 | P3 P3 | P1 ...\nmetric: wait / response / turnaround / throughput',
      answer: 'CPU 스케줄링은 준비 큐에서 다음 실행할 작업을 선택하는 정책입니다. FCFS는 단순하지만 긴 작업이 뒤 작업을 막을 수 있고, SJF는 평균 대기시간을 줄이지만 실행시간 예측과 기아 문제가 있습니다. Round Robin은 시간 할당량으로 대화형 응답성을 높이지만 너무 짧으면 문맥 전환 비용이 커집니다. 따라서 서버라면 처리량과 tail latency, 제어 시스템이라면 예측 가능성과 deadline처럼 목표에 맞춰 평가해야 합니다.',
      followups: ['선점형과 비선점형의 차이는?', 'priority inversion은 어떻게 완화하나요?', 'CPU-bound와 I/O-bound 작업을 어떻게 다르게 보나요?'],
      experience: '스마트팩토리나 SCADA에서는 평균 속도만이 아니라 최악 응답시간과 우선순위 역전을 고려해야 한다는 운영 관점으로 연결하세요.',
      quiz: ['Round Robin의 time quantum이 지나치게 작으면 커지는 비용은?', ['문맥 전환', 'DNS 캐시', '디스크 용량'], 0, '할당량이 너무 작으면 짧은 간격으로 전환이 일어나 유효 작업보다 스케줄링 오버헤드가 커질 수 있습니다.']
    },
    {
      id: 'virtual-memory', cat: 'os', title: '가상 메모리와 페이징, 페이지 폴트를 설명해 보세요.',
      overview: '가상 메모리는 각 프로세스에 독립적인 연속 주소 공간처럼 보이게 하고, 페이지 테이블로 가상 페이지를 물리 프레임에 매핑합니다.',
      principle: 'CPU는 TLB에서 변환을 먼저 찾고 실패하면 페이지 테이블을 조회합니다. 유효한 매핑이 없으면 페이지 폴트 예외가 발생하며, OS가 디스크에서 가져오거나 COW 페이지를 복사하거나 잘못된 접근을 종료합니다. 페이지 폴트가 모두 디스크 I/O를 뜻하는 것은 아닙니다. 작업 집합보다 물리 메모리가 부족해 교체가 반복되면 thrashing이 발생합니다.',
      diagram: 'virtual addr = [VPN | offset]\n             ↓ TLB hit\n          physical frame + offset\n             ↓ miss\n        page table → present?\n          yes / no → page fault handler',
      answer: '가상 메모리는 프로세스마다 독립된 주소 공간을 제공하고 페이지 단위로 물리 메모리에 매핑하는 방식입니다. 주소 변환은 TLB와 페이지 테이블을 사용합니다. 필요한 페이지가 현재 매핑되지 않으면 페이지 폴트가 발생해 운영체제가 디스크에서 적재하거나 copy-on-write를 처리하며, 불법 접근이면 프로세스를 종료합니다. 메모리가 부족해 페이지 교체가 과도하면 thrashing으로 성능이 급락하므로 working set과 fault rate를 함께 봐야 합니다.',
      followups: ['TLB가 필요한 이유는?', 'copy-on-write는 fork에 어떤 이점이 있나요?', '내부 단편화와 외부 단편화의 차이는?'],
      experience: 'JVM 메모리 문제나 AI 추론 서비스의 메모리 급증을 설명할 때 힙 사용량과 OS의 RSS·page fault·swap을 구분하는 관점으로 연결할 수 있습니다.',
      quiz: ['페이지 폴트에 대한 올바른 설명은?', ['항상 치명적 오류다', '항상 디스크를 읽는다', 'OS가 처리 가능한 정상적 예외일 수도 있다'], 2, 'demand paging, copy-on-write 등 정상 동작에서도 페이지 폴트가 발생하며 반드시 디스크 I/O를 동반하지는 않습니다.']
    },
    {
      id: 'acid-isolation', cat: 'db', title: '트랜잭션 ACID와 격리 수준을 설명해 보세요.',
      overview: '트랜잭션은 여러 읽기·쓰기를 하나의 논리적 작업으로 묶습니다. 격리 수준은 동시성 이상을 얼마나 차단할지와 성능의 균형입니다.',
      principle: 'ACID는 원자성, 일관성, 격리성, 지속성입니다. SQL 표준의 Read Uncommitted, Read Committed, Repeatable Read, Serializable은 일반적으로 강도가 높아집니다. 그러나 MVCC와 잠금 구현에 따라 같은 이름에서도 세부 현상이 달라질 수 있습니다. lost update·write skew 등은 표의 세 현상만으로 다 설명되지 않으므로 DB 문서를 확인합니다.',
      diagram: 'T1: read x=10 ───────── write x=11\nT2:      read x=10 ─ write x=11   ← lost update\n\nIsolation ↑  anomalies ↓  contention/retry may ↑',
      answer: '트랜잭션은 여러 연산을 하나의 논리 단위로 묶고 ACID를 지향합니다. 원자성은 전부 성공하거나 롤백, 일관성은 제약을 만족하는 상태 전이, 격리성은 동시 실행이 서로 간섭하지 않게 보이도록 하는 성질, 지속성은 커밋 결과의 보존입니다. 격리 수준이 높을수록 이상 현상은 줄지만 잠금·재시도 비용이 커질 수 있습니다. 실제 보장은 DB의 MVCC와 잠금 구현이 다르므로 제품 문서와 충돌 패턴을 확인합니다.',
      followups: ['non-repeatable read와 phantom read의 차이는?', 'MVCC는 읽기와 쓰기 충돌을 어떻게 줄이나요?', 'Serializable에서도 재시도가 필요한 이유는?'],
      experience: 'ConsentLedger의 동의 변경과 감사 로그를 예로 들어 “원자적으로 함께 커밋되어야 할 데이터”를 설명하세요. 비관적 락을 썼다는 공개 포트폴리오 사실과, 선택 이유는 본인 실제 판단 범위에서 구분합니다.',
      quiz: ['격리 수준을 높일 때 일반적으로 고려할 trade-off는?', ['동시성 저하나 재시도 증가', '암호화 키 소멸', 'DNS TTL 증가'], 0, '더 강한 격리는 충돌 대기, 직렬화 실패와 재시도 등 비용을 늘릴 수 있습니다.']
    },
    {
      id: 'index-btree', cat: 'db', title: 'DB 인덱스와 B+Tree를 설명해 보세요.',
      overview: '인덱스는 검색 키와 레코드 위치를 별도 구조로 유지해 전체 스캔을 줄입니다. 대신 저장 공간과 쓰기·유지 비용이 발생합니다.',
      principle: 'B+Tree는 높은 fan-out으로 높이를 낮추고 리프에 정렬된 키를 연결해 범위 검색에 적합합니다. 복합 인덱스는 보통 선두 컬럼 순서가 중요하며, 선택도뿐 아니라 쿼리 조건·정렬·커버링 여부를 함께 봅니다. 함수 적용, 암시적 형 변환, 낮은 선택도 등으로 인덱스가 선택되지 않을 수 있습니다.',
      diagram: '          [20 | 50]            root\n        /     |      \\\n [1..19] ↔ [20..49] ↔ [50..]       leaves\n            ordered scan →→',
      answer: '인덱스는 컬럼 값과 행 위치를 별도 구조로 저장해 필요한 페이지를 빠르게 찾게 합니다. B+Tree는 내부 노드에는 탐색 키, 리프에는 정렬된 키와 포인터를 두고 리프를 연결해 동등·범위·정렬 조회에 유리합니다. 대신 삽입·수정 때 트리를 유지하고 저장 공간을 사용합니다. 그래서 자주 쓰는 WHERE와 JOIN, ORDER BY 패턴을 기준으로 복합 인덱스 순서를 잡고 실행 계획과 실제 통계로 검증합니다.',
      followups: ['클러스터드와 보조 인덱스의 차이는?', '복합 인덱스 (a,b)가 b 단독 조건에 항상 유효한가요?', '인덱스가 많을수록 나쁜 이유는?'],
      experience: 'ConsentLedger의 감사 로그 조회나 SCADA 시계열 이벤트 조회를 가정할 때 “시간·주체·유형 중 실제 필터와 정렬 패턴”을 근거로 인덱스를 설계한다고 답하세요.',
      quiz: ['B+Tree가 범위 검색에 유리한 주된 이유는?', ['리프 키가 정렬되고 연결되어 있어서', '모든 값을 해시해서', '데이터를 암호화해서'], 0, '시작 키를 찾은 뒤 연결된 리프를 순차적으로 읽을 수 있어 범위와 정렬 조회에 유리합니다.']
    },
    {
      id: 'join', cat: 'db', title: 'JOIN 종류와 실행 방식을 설명해 보세요.',
      overview: '논리적 JOIN은 어떤 행을 결과에 포함할지 정의하고, 물리적 JOIN 알고리즘은 DB가 그 결과를 어떻게 계산할지 결정합니다.',
      principle: 'INNER는 양쪽 조건 일치, LEFT OUTER는 왼쪽 전체와 오른쪽 일치, CROSS는 곱집합입니다. 실행기는 nested loop, hash join, sort-merge join 등을 통계·인덱스·메모리·정렬 상태에 따라 선택합니다. WHERE에서 오른쪽 테이블 조건을 잘못 적용하면 LEFT JOIN이 사실상 INNER JOIN처럼 될 수 있습니다.',
      diagram: 'Logical: A LEFT JOIN B ON A.id=B.id\nResult: all A + matching B + NULL if absent\n\nPhysical choices:\nsmall outer + index → nested loop\nequi-join, enough memory → hash join\nsorted/range-friendly → merge join',
      answer: 'INNER JOIN은 조건이 맞는 행만, LEFT OUTER JOIN은 왼쪽 행을 모두 유지하고 일치하지 않는 오른쪽 값을 NULL로 반환합니다. 이는 결과 의미이고, 실제 계산은 nested loop, hash, sort-merge 같은 물리 알고리즘으로 수행됩니다. 옵티마이저는 행 수 추정과 인덱스, 메모리 등을 보고 고르므로 느린 JOIN은 SQL 문법만 보지 않고 실행 계획의 추정치와 실제 행 수, 스캔 방식부터 확인합니다.',
      followups: ['ON 조건과 WHERE 조건의 차이는?', 'N+1 문제는 JOIN과 어떤 관련이 있나요?', '통계가 오래되면 왜 잘못된 계획이 나올 수 있나요?'],
      experience: '스마트팩토리에서 주문·공정·검사·납기 테이블을 연결할 때, 누락된 검사도 보여야 하면 OUTER JOIN이 필요한 이유로 연결할 수 있습니다.',
      quiz: ['LEFT JOIN 후 WHERE right.status = \'OK\'를 적용하면 일치하지 않은 왼쪽 행은?', ['항상 유지된다', 'NULL 조건에서 탈락할 수 있다', '중복만 제거된다'], 1, '오른쪽이 없는 행은 right.status가 NULL이므로 WHERE 조건을 통과하지 못해 LEFT JOIN 의도가 깨질 수 있습니다.']
    },
    {
      id: 'normalization', cat: 'db', title: '정규화와 반정규화의 기준을 설명해 보세요.',
      overview: '정규화는 중복과 갱신 이상을 줄이도록 속성과 관계를 분해하는 과정입니다. 반정규화는 측정된 읽기 병목을 해결하기 위해 일부 중복을 의도적으로 허용합니다.',
      principle: '1NF는 원자값, 2NF는 복합 키의 부분 함수 종속 제거, 3NF는 키가 아닌 속성 간 이행 종속 제거가 핵심입니다. BCNF는 모든 결정자가 후보 키여야 합니다. 무조건 높은 정규형이 정답은 아니며 무손실 분해와 종속성 보존, 접근 패턴을 함께 봅니다.',
      diagram: 'Before: Order(orderId, customerName, productName, qty)\n                 ↘ duplicated names / update anomaly\nAfter:  Customer ─ Order ─ OrderItem ─ Product\n\nDenormalize only with measured read need + consistency plan',
      answer: '정규화는 함수 종속을 기준으로 테이블을 분해해 중복과 삽입·수정·삭제 이상을 줄이는 과정입니다. 예를 들어 주문 행마다 고객 이름을 반복 저장하지 않고 고객과 주문을 분리합니다. 다만 조회마다 과도한 JOIN이 발생해 실제 병목이 확인되면 캐시, 집계 테이블, 일부 중복 같은 반정규화를 검토할 수 있습니다. 이때 원본의 기준과 동기화 방식, 실패 복구를 함께 설계해야 합니다.',
      followups: ['함수 종속이란?', '무손실 분해란?', '반정규화 데이터의 일관성을 어떻게 유지하나요?'],
      experience: '제조 공정 납기 예측 데이터에서 운영 원천 테이블과 학습용 feature table을 분리하는 이유를 연결하되, 분석용 비정규화 스냅샷과 OLTP 스키마를 구분해 설명하세요.',
      quiz: ['반정규화를 먼저 적용하기보다 우선 해야 할 일은?', ['실제 쿼리와 병목 측정', '모든 테이블 합치기', '외래키 전부 제거'], 0, '반정규화는 일관성 비용이 있으므로 실행 계획·지연·부하를 측정하고 대안을 비교한 뒤 적용해야 합니다.']
    },
    {
      id: 'sql-injection', cat: 'db', title: 'SQL Injection의 원인과 방어를 설명해 보세요.',
      overview: 'SQL Injection은 신뢰할 수 없는 입력이 SQL 코드 구조에 합쳐져 의도하지 않은 쿼리로 해석되는 취약점입니다.',
      principle: '핵심 방어는 prepared statement와 parameter binding으로 코드와 데이터를 분리하는 것입니다. 입력 검증은 도메인 제약에 유용하지만 단독 방어가 아닙니다. 동적 테이블명·정렬 컬럼처럼 바인딩할 수 없는 식별자는 허용 목록으로 선택합니다. 최소 권한, 오류 정보 제한, 로깅은 피해와 탐지를 보완합니다.',
      diagram: 'BAD:  "... WHERE id=" + userInput\n      data ───────────────┘ becomes SQL syntax\n\nGOOD: "... WHERE id = ?" + bind(value)\n      SQL structure fixed | value stays data',
      answer: 'SQL Injection은 사용자 입력을 문자열 결합으로 쿼리에 넣어 데이터가 SQL 문법으로 실행되는 문제입니다. 가장 중요한 방어는 prepared statement와 파라미터 바인딩으로 코드와 데이터를 분리하는 것입니다. 동적 정렬 컬럼처럼 바인딩하기 어려운 식별자는 서버의 허용 목록에서 선택합니다. 여기에 DB 계정 최소 권한, 상세 오류 비노출, 의심 쿼리 모니터링을 더해 우회와 피해 범위를 줄입니다.',
      followups: ['ORM을 쓰면 Injection이 완전히 사라지나요?', 'LIKE 검색 파라미터는 어떻게 처리하나요?', 'stored procedure도 취약할 수 있나요?'],
      experience: 'ConsentLedger와 NodeConnection처럼 무결성이 중요한 서비스에서는 입력 바인딩뿐 아니라 최소 권한·감사 로그·무결성 검증을 계층적으로 설명하세요. 블록체인이 Injection을 자동 방지하는 것은 아닙니다.',
      quiz: ['SQL Injection의 1차 방어로 가장 적절한 것은?', ['문자열 치환 필터만 사용', '파라미터 바인딩', 'DB 오류 전체 공개'], 1, '파라미터 바인딩은 입력을 SQL 구조가 아닌 값으로 전달합니다. ORM도 raw query를 문자열 결합하면 취약할 수 있습니다.']
    },
    {
      id: 'crypto-hash', cat: 'security', title: '암호화와 해시, 전자서명의 차이는 무엇인가요?',
      overview: '암호화는 기밀성, 해시는 고정 길이 요약을 통한 무결성 보조, 전자서명은 개인키 소유자의 서명과 공개키 검증을 통한 무결성·인증을 목표로 합니다.',
      principle: '대칭키는 같은 비밀키로 암복호화해 빠르고, 공개키 방식은 공개키·개인키 쌍을 사용해 키 교환과 서명 등에 활용합니다. 일반 해시는 복호화 대상이 아닙니다. 비밀번호는 빠른 SHA-256 단독이 아니라 salt와 함께 Argon2id, bcrypt, scrypt, PBKDF2 같은 느린 KDF로 저장합니다. 해시 체인은 변경 탐지에 도움을 주지만 외부 신뢰 기준과 키 관리 없이 완전한 위변조 방지를 보장하지 않습니다.',
      diagram: 'Encryption: plaintext + key ⇄ ciphertext\nHash:       message → digest (one-way intent)\nSignature:  hash(message) + private key → signature\n            public key + message → verify',
      answer: '암호화는 키를 가진 주체만 내용을 읽게 하는 기밀성 기술이고, 해시는 입력을 고정 길이 요약으로 바꿔 변경 여부를 확인하는 데 씁니다. 전자서명은 메시지 해시에 개인키로 서명하고 공개키로 검증해 발신 주체와 무결성을 확인합니다. 실무에서는 데이터를 대칭키로 암호화하고 공개키 방식으로 키를 합의하는 하이브리드 구성을 많이 쓰며, 비밀번호는 salt와 느린 KDF로 저장합니다.',
      followups: ['salt와 pepper의 차이는?', 'AES-GCM 같은 AEAD가 주는 보장은?', '인증서가 공개키를 어떻게 신원과 묶나요?'],
      experience: 'ConsentLedger의 SHA-256 해시 체인 감사 로그와 NodeConnection의 위변조 탐지를 연결하세요. “해시를 썼으니 삭제·재작성도 절대 불가능”이라고 과장하지 말고, DB 제약·접근통제·외부 앵커 등 보완 통제를 함께 말합니다.',
      quiz: ['비밀번호 저장 방식으로 가장 적절한 것은?', ['SHA-256 한 번', 'AES로 암호화 후 키를 같은 DB에 저장', '고유 salt와 Argon2id 같은 비밀번호 KDF'], 2, '비밀번호는 유출 후 대입 공격 비용을 높이기 위해 salt와 계산·메모리 비용이 큰 전용 KDF를 사용합니다.']
    },
    {
      id: 'nac-access', cat: 'security', title: 'NAC와 접근통제를 설명해 보세요.',
      overview: 'NAC는 네트워크에 접속하는 사용자와 단말의 신원·상태를 확인하고 정책에 따라 허용, 격리, 제한하는 통제입니다. 인증과 인가, 지속적 상태 확인을 구분해야 합니다.',
      principle: '802.1X 환경에서는 supplicant, authenticator(스위치/AP), authentication server(RADIUS)가 협력합니다. MAC 기반 우회 방식은 위조 가능성을 고려해야 합니다. RBAC는 역할, ABAC는 사용자·단말·시간·위험 같은 속성으로 판단합니다. 최소 권한과 default deny, 예외의 만료·감사가 중요합니다.',
      diagram: 'Device/supplicant\n   │ EAP over LAN\nSwitch/AP (authenticator)\n   │ RADIUS\nPolicy/Auth server → permit / quarantine / deny\n                  ↘ VLAN / ACL / posture action',
      answer: 'NAC는 누가 어떤 단말로 네트워크에 들어오는지 확인하고 보안 상태와 정책에 따라 허용·격리·차단하는 체계입니다. 802.1X라면 단말의 supplicant, 스위치나 AP의 authenticator, RADIUS 인증 서버가 역할을 나눕니다. 인증은 신원 확인이고 인가는 허용 범위 결정입니다. 운영에서는 최소 권한과 기본 차단을 두되, 예외 계정·장비의 만료, 가용성 장애 시 정책, 로그 감사를 함께 설계해야 합니다.',
      followups: ['NAC 서버 장애 시 fail-open과 fail-close를 어떻게 선택하나요?', 'MAC 인증만으로 부족한 이유는?', 'RBAC와 ABAC를 함께 쓸 수 있나요?'],
      experience: 'K-water NAC/네트워크 장애 진단과 해군 망 운영 경험을 가장 직접적으로 연결할 문항입니다. 장애 당시 관측한 증상, 정책/인증/경로 중 어느 계층을 검증했는지, 서비스 복구와 보안 사이에서 어떤 절차를 따랐는지만 사실대로 구조화하세요.',
      quiz: ['802.1X에서 스위치/AP의 대표 역할은?', ['Supplicant', 'Authenticator', '인증서 발급 CA만'], 1, '스위치나 AP는 단말과 인증 서버 사이에서 EAP 메시지를 중계하고 포트 접근 상태를 적용하는 authenticator 역할을 합니다.']
    },
    {
      id: 'xss-csrf', cat: 'security', title: 'XSS와 CSRF의 차이와 방어를 설명해 보세요.',
      overview: 'XSS는 신뢰되지 않은 스크립트가 피해자의 브라우저에서 실행되는 문제이고, CSRF는 로그인된 브라우저가 공격자가 의도한 요청을 보내도록 악용하는 문제입니다.',
      principle: 'XSS는 출력 위치에 맞는 인코딩, 안전한 DOM API, sanitization, CSP로 방어합니다. CSRF는 예측 불가능한 토큰, SameSite 쿠키, Origin/Referer 확인, 중요한 동작의 재인증을 조합합니다. XSS가 있으면 페이지의 토큰을 읽거나 동일 출처 요청을 만들 수 있어 CSRF 방어도 우회될 수 있으므로 XSS 방어가 우선입니다.',
      diagram: 'XSS: attacker input → trusted page → script runs in victim origin\nCSRF: attacker page → victim browser + ambient cookie → target action\n\nDefense: context encoding / CSP | CSRF token / SameSite / Origin',
      answer: 'XSS는 공격자 입력이 HTML이나 JavaScript 문맥에 삽입돼 피해자 브라우저에서 실행되는 취약점이고, CSRF는 로그인 쿠키가 자동 전송되는 점을 악용해 사용자가 원치 않는 요청을 보내게 합니다. XSS는 출력 문맥별 인코딩과 안전한 DOM API, CSP로 줄이고, CSRF는 토큰·SameSite 쿠키·Origin 검증을 조합합니다. 상태 변경은 GET으로 만들지 않고 중요한 작업은 재인증도 고려합니다.',
      followups: ['stored·reflected·DOM XSS의 차이는?', 'HttpOnly 쿠키가 XSS를 완전히 막나요?', 'CORS가 CSRF 방어책과 같은가요?'],
      experience: 'ConsentLedger처럼 동의 철회·전송 요청이 중요한 서비스에서는 CSRF 토큰뿐 아니라 재인증, 감사 이벤트, 멱등성까지 연결해 피해와 추적을 함께 설명하세요.',
      quiz: ['CSRF의 성립에 흔히 이용되는 브라우저 동작은?', ['대상 사이트 쿠키의 자동 첨부', '서버의 GC', 'DNSSEC 서명'], 0, '브라우저가 대상 도메인의 세션 쿠키를 자동 전송하는 성질을 악용합니다. SameSite 등으로 이를 제한할 수 있습니다.']
    },
    {
      id: 'oauth', cat: 'security', title: 'OAuth 2.0/2.1의 흐름과 보안 포인트를 설명해 보세요.',
      overview: 'OAuth는 사용자의 비밀번호를 클라이언트에 주지 않고 제한된 자원 접근 권한을 위임하기 위한 프레임워크입니다. 로그인 신원 계층은 OpenID Connect가 보완합니다.',
      principle: 'Authorization Code + PKCE에서 클라이언트는 브라우저를 authorization server로 보내고 code를 받은 뒤 verifier와 함께 토큰으로 교환합니다. redirect URI 정확 일치, state로 요청 연계, PKCE로 code 탈취 완화, 짧은 access token과 refresh token rotation을 고려합니다. JWT는 토큰 형식 중 하나일 뿐이며 OAuth와 동일어가 아닙니다.',
      diagram: 'User → Client → Authorization Server\n                 login/consent\nClient ← code ─────────────────\nClient + code_verifier → token endpoint\nClient + access token → Resource Server',
      answer: 'OAuth는 비밀번호를 제3자 앱에 주지 않고 범위와 기간이 제한된 접근 권한을 위임하는 프레임워크입니다. 권장 흐름인 Authorization Code와 PKCE에서는 먼저 code challenge를 보내고 받은 인가 코드를 verifier와 함께 토큰으로 교환해 코드 탈취를 완화합니다. redirect URI 검증, state, 최소 scope, 짧은 access token과 refresh token rotation이 중요합니다. 로그인 신원 정보가 필요하면 OpenID Connect를 사용합니다.',
      followups: ['access token과 ID token의 대상은 누구인가요?', 'PKCE가 client secret을 대체하나요?', 'JWT를 즉시 폐기하기 어려운 이유는?'],
      experience: 'Agent Runtime Security Lab의 OAuth 2.1 MCP 인증과 1회성 승인 capability를 연결해 “인증 이후에도 도구별 scope와 실행 시점 정책이 필요하다”고 설명하세요.',
      quiz: ['OAuth에서 ID token을 표준화해 인증 정보를 제공하는 계층은?', ['OpenID Connect', 'BFD', 'SQL'], 0, 'OpenID Connect는 OAuth 2.0 위에 인증 계층을 추가하고 ID token과 UserInfo 등의 규칙을 정의합니다.']
    },
    {
      id: 'jvm-gc', cat: 'java', title: 'JVM 메모리 구조와 GC를 설명해 보세요.',
      overview: 'JVM은 바이트코드를 실행하며 런타임 데이터 영역과 JIT 컴파일, GC를 제공합니다. 메모리 영역 이름과 세부 구현은 JVM 사양과 구현을 구분해 설명해야 합니다.',
      principle: '힙에는 주로 객체가, 각 스레드의 JVM 스택에는 프레임·지역변수·피연산자 스택이 놓입니다. 메서드 영역은 논리적 사양이며 HotSpot은 클래스 메타데이터를 Metaspace 등에 둡니다. GC는 도달 가능성으로 살아 있는 객체를 판단하고 collector에 따라 mark, copy, sweep, compact를 조합합니다. generational hypothesis를 활용하지만 모든 collector 구조가 동일하지 않습니다.',
      diagram: 'JVM process\n ├─ Heap (shared objects) ← GC roots reachability\n ├─ Method area (logical, shared)\n ├─ Thread A: PC + JVM stack + native stack\n └─ Thread B: PC + JVM stack + native stack\n\nbytecode → interpreter → hot code JIT',
      answer: 'JVM은 클래스 파일의 바이트코드를 로드하고 인터프리터와 JIT로 실행합니다. 객체는 주로 공유 힙에 있고, 각 스레드는 메서드 호출 프레임을 가진 JVM 스택과 PC를 가집니다. GC는 스택 변수나 정적 필드 같은 root에서 도달 가능한 객체를 살리고 나머지를 회수합니다. collector마다 pause, 처리량, 메모리 목표가 달라서 G1, ZGC 등을 이름만 고르기보다 할당률, 힙 크기, pause 목표를 측정해 선택·튜닝합니다.',
      followups: ['Stop-The-World는 언제 발생하나요?', 'minor/major/full GC 용어가 구현별로 주의가 필요한 이유는?', '메모리 누수는 GC 언어에서도 가능한가요?'],
      experience: 'Java/Spring 프로젝트에서 지연을 설명할 때 애플리케이션 로그, GC pause, heap occupancy, OS 메모리를 분리해 보는 관점으로 연결하세요. 측정 경험이 없으면 일반 진단 절차로 말합니다.',
      quiz: ['GC 대상에서 객체가 살아 있다고 판단하는 일반 기준은?', ['GC root에서 도달 가능함', '생성된 지 1초 미만', '클래스 이름 길이'], 0, '현대 JVM GC는 참조 카운트보다 GC root로부터의 도달 가능성을 핵심 기준으로 사용합니다.']
    },
    {
      id: 'oop', cat: 'java', title: '객체지향의 핵심과 좋은 설계를 설명해 보세요.',
      overview: '객체지향은 데이터와 행위를 객체로 묶고, 변화의 영향을 경계 안에 가두며 객체 간 협력으로 문제를 모델링하는 접근입니다.',
      principle: '캡슐화는 내부 상태와 변경 규칙을 보호하고, 추상화는 중요한 개념만 노출합니다. 상속은 타입 관계와 재사용 수단이지만 강한 결합을 만들 수 있어 합성을 우선 검토합니다. 다형성은 같은 인터페이스에 다양한 구현을 교체하게 합니다. SOLID는 목적이 아니라 변화 비용을 낮추는 판단 도구입니다.',
      diagram: 'OrderService → PaymentPort (interface)\n                    ↑       ↑\n               CardPay   BankPay\n\nPolicy depends on abstraction; implementations vary',
      answer: '객체지향의 핵심은 단순히 클래스를 많이 만드는 것이 아니라 상태와 규칙을 캡슐화하고, 역할과 책임을 가진 객체가 협력하게 해 변화의 영향을 줄이는 데 있다고 봅니다. 추상화와 다형성으로 상위 정책이 구체 구현에 덜 의존하게 만들고, 상속은 정말 is-a 관계일 때 신중히 쓰며 재사용만 목적이면 합성을 우선합니다. 좋은 설계인지는 테스트 용이성과 변경 시 수정 범위로 검증합니다.',
      followups: ['상속보다 합성이 유리한 경우는?', 'LSP 위반 사례는?', 'equals와 hashCode 계약이 중요한 이유는?'],
      experience: 'ConsentLedger나 NodeConnection에서 외부 저장소·블록체인·AI 연동을 포트 인터페이스 뒤로 분리한 실제 구조가 있다면 다형성과 DIP 사례로 사용하세요. 저장소 구조와 다르면 억지로 맞추지 않습니다.',
      quiz: ['HashSet에서 equals가 같은 두 객체가 다른 hashCode를 가지면 생길 수 있는 문제는?', ['동등 객체가 별도 버킷에 존재할 수 있다', '컴파일이 항상 실패한다', 'JVM이 종료된다'], 0, 'equals가 true인 객체는 같은 hashCode를 반환해야 해시 기반 컬렉션의 탐색 계약이 유지됩니다.']
    },
    {
      id: 'spring-di', cat: 'java', title: 'IoC·DI와 Spring Bean 생명주기를 설명해 보세요.',
      overview: 'IoC는 객체 생성과 연결의 제어권을 애플리케이션 코드 밖의 컨테이너로 옮기는 개념이고, DI는 필요한 의존성을 외부에서 제공하는 구현 방식입니다.',
      principle: 'Spring은 BeanDefinition을 바탕으로 인스턴스 생성, 의존성 주입, aware callback, BeanPostProcessor 전후 처리, 초기화 콜백을 거쳐 빈을 준비하고 컨텍스트 종료 시 파괴 콜백을 호출합니다. 실제 순서는 확장 지점에 따라 복잡할 수 있습니다. 생성자 주입은 필수 의존성과 불변성, 테스트에 유리합니다. singleton 빈은 공유되므로 mutable state를 두면 동시성 문제가 생길 수 있습니다.',
      diagram: 'scan/config → BeanDefinition\n → instantiate → inject dependencies\n → BeanPostProcessor(before)\n → init callback\n → BeanPostProcessor(after / proxy)\n → ready → destroy on context close',
      answer: 'IoC는 객체 생성과 의존 관계 제어를 Spring 컨테이너가 맡는 것이고, DI는 그 의존성을 생성자 등으로 주입하는 방식입니다. 컨테이너는 빈 정의를 읽어 객체를 만들고 의존성을 연결한 뒤 BeanPostProcessor와 초기화 과정을 거쳐 사용 가능하게 합니다. 저는 필수 의존성이 드러나고 불변성을 지키기 쉬운 생성자 주입을 선호합니다. 기본 singleton 빈은 여러 요청이 공유하므로 요청별 mutable state를 필드에 두지 않습니다.',
      followups: ['순환 참조가 설계 신호인 이유는?', '@Configuration proxyBeanMethods는 무엇에 영향을 주나요?', 'prototype 빈의 destroy는 누가 관리하나요?'],
      experience: 'Spring Boot 프로젝트에서 서비스·저장소·외부 연동을 주입해 테스트 대역으로 교체한 실제 경험이 있다면 연결하세요. “DI를 썼다”보다 교체 가능성과 테스트 효과를 말합니다.',
      quiz: ['singleton Spring Bean 필드에 요청별 사용자 정보를 저장하면 위험한 이유는?', ['여러 스레드가 같은 상태를 공유할 수 있어서', 'JVM이 클래스를 못 읽어서', 'HTTP가 UDP로 바뀌어서'], 0, '기본 singleton 빈은 요청 간 공유되므로 가변 필드는 데이터 혼합과 경쟁 상태를 일으킬 수 있습니다.']
    },
    {
      id: 'spring-aop-mvc', cat: 'java', title: 'Spring AOP와 MVC 요청 흐름을 설명해 보세요.',
      overview: 'MVC는 웹 요청 처리 책임을 분리하고, AOP는 로깅·트랜잭션·인가 같은 횡단 관심사를 프록시 기반으로 적용합니다.',
      principle: '요청은 Filter를 거쳐 DispatcherServlet에 도달하고, HandlerMapping·HandlerAdapter가 컨트롤러를 호출합니다. ArgumentResolver와 메시지 컨버터가 입출력을 변환하며 예외 처리 후 응답합니다. Spring AOP는 주로 프록시를 사용하므로 같은 객체 내부의 self-invocation은 프록시를 우회할 수 있습니다. private/final 메서드와 proxy 방식의 제약도 확인해야 합니다.',
      diagram: 'Client → Filter → DispatcherServlet\n → HandlerMapping → Interceptor.pre\n → Controller → Service proxy[AOP] → target\n → MessageConverter / View → Response',
      answer: 'Spring MVC에서 요청은 Filter를 지난 뒤 DispatcherServlet이 HandlerMapping으로 컨트롤러를 찾고 HandlerAdapter를 통해 호출합니다. 인자 변환과 검증, 메시지 컨버터를 거쳐 응답이 직렬화됩니다. AOP는 이 흐름의 서비스 호출 등에 프록시를 두어 트랜잭션·로깅·인가 같은 공통 기능을 핵심 로직과 분리합니다. 다만 같은 객체 내부 호출은 프록시를 거치지 않아 @Transactional이 적용되지 않을 수 있어 경계를 확인해야 합니다.',
      followups: ['Filter와 Interceptor, AOP의 적용 위치 차이는?', '@Transactional rollback 규칙은?', 'ControllerAdvice는 어디에 쓰나요?'],
      experience: 'ConsentLedger의 트랜잭션과 감사 로깅, SecureScope의 Spring ApplicationEvent 분리를 실제 구현 범위에서 비교해 “동기 트랜잭션 경계”와 “이벤트 기반 결합 완화”를 설명할 수 있습니다.',
      quiz: ['같은 클래스의 메서드가 this.otherMethod()로 @Transactional 메서드를 호출할 때 주의할 점은?', ['프록시를 우회해 advice가 적용되지 않을 수 있다', '항상 새 프로세스가 생긴다', 'SQL이 자동 암호화된다'], 0, '일반적인 proxy 기반 Spring AOP에서는 외부에서 프록시를 통해 들어오는 호출에 advice가 적용됩니다.']
    },
    {
      id: 'linear-structures', cat: 'algorithm', title: '배열·연결 리스트·스택·큐·해시를 비교해 보세요.',
      overview: '자료구조 선택은 “평균 복잡도” 한 줄보다 접근 패턴, 메모리 지역성, 최악 성능, 순서 보존, 동시성 요구를 함께 봐야 합니다.',
      principle: '배열은 연속 메모리와 O(1) 인덱스 접근, 연결 리스트는 노드 포인터와 위치를 안다면 삽입·삭제 O(1)이지만 탐색 O(n)입니다. 스택은 LIFO, 큐는 FIFO입니다. 해시 테이블은 평균 O(1) 탐색을 기대하지만 충돌·리사이즈·나쁜 해시에서 비용이 커지고 순서·범위 검색은 트리보다 불리합니다.',
      diagram: 'Array: [a][b][c][d]  cache-friendly, index O(1)\nList:  [a]→[b]→[c]     traversal O(n)\nStack: push/pop ↔ top   LIFO\nQueue: in → [ ][ ] → out FIFO\nHash:  key → hash → bucket → collision strategy',
      answer: '배열은 연속 저장으로 인덱스 접근과 캐시 지역성이 좋지만 중간 삽입 시 이동 비용이 큽니다. 연결 리스트는 노드 위치를 알고 있으면 연결 변경으로 삽입·삭제가 쉽지만 탐색과 메모리 오버헤드가 있습니다. 스택은 되돌리기·호출 흐름 같은 LIFO, 큐는 작업 처리 같은 FIFO에 맞습니다. 해시 테이블은 평균 상수 시간 조회에 유리하지만 충돌과 최악 성능, 순서·범위 검색 요구를 고려해야 합니다.',
      followups: ['ArrayList가 LinkedList보다 중간 순회에 유리한 이유는?', '해시 충돌 해결 방식은?', 'Deque 하나로 스택과 큐를 구현할 수 있나요?'],
      experience: '장애 이벤트 상관분석에서는 최근 N개 이벤트를 큐·deque로, 장비 ID 빠른 조회는 해시로 표현하는 식으로 NetSentry/SecureScope 문제에 연결할 수 있습니다.',
      quiz: ['일반적인 배열 순회가 연결 리스트보다 빠를 수 있는 하드웨어적 이유는?', ['메모리 지역성과 cache 활용', '항상 O(0)이어서', '암호화가 없어서'], 0, '연속 메모리는 cache line과 prefetch를 잘 활용하므로 같은 O(n)이라도 실제 성능이 유리할 수 있습니다.']
    },
    {
      id: 'tree-heap-graph', cat: 'algorithm', title: '트리·힙·그래프와 BFS·DFS를 설명해 보세요.',
      overview: '트리는 계층 구조의 특수한 그래프이고, 힙은 최댓값·최솟값을 빠르게 꺼내는 완전 이진 트리 기반 구조입니다. BFS와 DFS는 그래프 탐색 전략입니다.',
      principle: 'BFS는 큐를 사용해 가까운 레벨부터 탐색하므로 가중치 없는 그래프의 최단 간선 수 경로에 적합합니다. DFS는 스택/재귀로 깊게 탐색해 경로 탐색, 사이클·위상 구조 등에 활용합니다. 둘 다 인접 리스트 기준 O(V+E)입니다. Dijkstra는 음수 가중치가 없는 그래프에서 우선순위 큐로 최단거리를 확정합니다.',
      diagram: '      A\n    /   \\\n   B     C\n  / \\     \\\n D   E     F\nBFS: A B C D E F\nDFS: A B D E C F\nHeap: root is min/max, not globally sorted',
      answer: '트리는 사이클이 없는 계층 구조이고 그래프는 일반적인 정점·간선 관계를 표현합니다. 힙은 부모와 자식의 대소 관계만 유지해 최솟값이나 최댓값 조회가 O(1), 삽입·삭제가 O(log n)인 우선순위 큐 구현에 적합합니다. BFS는 큐로 가까운 정점부터 방문해 무가중 최단 경로에 쓰고, DFS는 깊이 탐색으로 경로·사이클·위상 문제에 활용합니다.',
      followups: ['힙 정렬 상태와 BST 정렬 상태는 어떻게 다른가요?', 'visited가 필요한 이유는?', 'Dijkstra가 음수 간선에서 실패하는 이유는?'],
      experience: 'TelcoNet Sentinel의 네트워크 토폴로지를 그래프로 보고 링크·노드 장애 시 도달 가능성과 대체 경로를 탐색한 관점에 연결하세요. 실제 알고리즘 구현과 도구가 수행한 분석을 구분합니다.',
      quiz: ['가중치가 없는 그래프에서 시작점부터 최소 간선 수 경로를 찾기 적합한 것은?', ['BFS', '임의 DFS 첫 경로', '해시만 사용'], 0, 'BFS는 거리 레벨 순서로 방문하므로 최초 방문 시 최소 간선 수 거리를 얻습니다.']
    },
    {
      id: 'complexity-sort', cat: 'algorithm', title: '시간복잡도와 정렬 선택 기준을 설명해 보세요.',
      overview: 'Big-O는 입력 크기에 따른 증가율의 상한을 표현하며 실제 시간 그 자체가 아닙니다. 정렬은 평균·최악 시간, 안정성, 메모리, 데이터 특성을 함께 봅니다.',
      principle: '비교 정렬은 일반적으로 Ω(n log n) 하한이 있습니다. merge sort는 O(n log n)과 안정성을 제공하지만 추가 메모리가 필요하고, quicksort는 평균 O(n log n), 최악 O(n²)이지만 locality가 좋습니다. heapsort는 최악 O(n log n), in-place이지만 안정적이지 않습니다. 언어 라이브러리는 하이브리드 알고리즘을 쓸 수 있습니다.',
      diagram: 'n=1,000,000\nO(log n)  ≈ 20\nO(n)      = 1,000,000\nO(n log n)≈ 20,000,000\nO(n²)     = 10¹²\n\nBut constants, cache, I/O, distribution still matter.',
      answer: 'Big-O는 입력이 커질 때 연산량이 얼마나 증가하는지 보는 도구로, 실제 실행시간과 상수·캐시·I/O를 모두 대체하지는 않습니다. 정렬은 데이터 크기와 분포, 안정성, 추가 메모리 요구를 봅니다. 예를 들어 안정 정렬과 예측 가능한 O(n log n)이 필요하면 merge 계열, 메모리와 locality가 중요하고 평균 성능을 활용할 수 있으면 quick 계열을 고려합니다. 실무에서는 검증된 표준 라이브러리와 프로파일링을 우선합니다.',
      followups: ['안정 정렬이 필요한 예시는?', 'amortized complexity란?', '공간복잡도도 함께 봐야 하는 이유는?'],
      experience: '공정 데이터 처리에서는 알고리즘 복잡도뿐 아니라 데이터 로딩·전처리·추론 I/O가 병목일 수 있다고 연결하고, 프로파일링 후 최적화한 실제 사례가 있으면 덧붙이세요.',
      quiz: ['안정 정렬의 의미는?', ['같은 키를 가진 원소의 기존 상대 순서를 유지', '항상 O(n)', '추가 메모리를 전혀 쓰지 않음'], 0, '동일 키 원소의 원래 순서를 보존하는 성질이며 시간·공간 복잡도와는 별도 특성입니다.']
    },
    {
      id: 'ml-evaluation', cat: 'ai', title: 'AI 모델 평가와 데이터 누수를 설명해 보세요.',
      overview: '좋은 오프라인 점수는 운영 성능을 보장하지 않습니다. 분할 방식, 누수, 클래스 불균형, 의사결정 비용, 시간에 따른 분포 변화를 함께 봐야 합니다.',
      principle: '전처리 통계·feature 선택·중복 샘플·미래 정보가 검증 세트에서 학습으로 새면 누수입니다. 시간 데이터는 미래를 학습해 과거를 예측하지 않도록 temporal split을 고려합니다. 불균형 문제에서 accuracy만 보면 위험하며 precision, recall, F1, PR-AUC, calibration과 업무 비용을 봅니다. threshold는 모델과 별도의 운영 정책입니다.',
      diagram: 'raw data → split FIRST\n train ─ fit preprocessing/model ─┐\n valid ─ transform only ──────────┤→ metrics + threshold\n test  ─ final once ──────────────┘\nproduction → drift / latency / cost / feedback monitor',
      answer: '데이터 누수는 예측 시점에 알 수 없는 정보나 검증 데이터의 통계가 학습에 들어가 오프라인 성능이 과대평가되는 문제입니다. 그래서 먼저 분할하고 전처리는 학습 세트에만 fit하며, 공정 시계열이면 시간 순서를 지킵니다. 납기 지연처럼 불균형한 문제는 accuracy보다 지연을 놓치지 않는 recall과 오탐 비용인 precision, PR-AUC와 calibration을 함께 보고, 운영 비용에 맞춰 threshold를 정합니다.',
      followups: ['교차검증이 시계열에서 주의할 점은?', 'concept drift와 data drift의 차이는?', '확률 calibration은 왜 필요한가요?'],
      experience: 'KT AIVLE 자동차 공정 리스크 예측 프로젝트의 납품 지연 가능성·예상 지연 시간 예측을 연결하세요. 사용한 분할, 실제 지표, 담당 역할은 확인된 사실만 말하고 팀 성과와 개인 기여를 분리합니다.',
      quiz: ['시간 순서가 있는 납기 예측에서 무작위 분할이 위험한 대표 이유는?', ['미래 패턴이 학습에 섞일 수 있어서', 'GPU가 느려져서', 'SQL JOIN이 금지돼서'], 0, '미래 관측이 학습에 들어가 과거 검증 샘플을 예측하면 실제 배포 상황보다 성능이 부풀려질 수 있습니다.']
    },
    {
      id: 'smartfactory-architecture', cat: 'ai', title: '스마트팩토리 AI 시스템을 어떻게 설계하겠습니까?',
      overview: '스마트팩토리 AI는 모델 하나가 아니라 센서·PLC/SCADA·수집·저장·feature·추론·알림·사람의 조치·재학습을 잇는 운영 시스템입니다.',
      principle: 'OT 안전과 가용성을 우선하고 제어망과 IT/AI 영역을 분리·중계합니다. 이벤트 시간, 장비 ID, 품질·결측, schema를 관리하며 지연 예산과 offline fallback을 둡니다. 모델은 shadow/canary로 검증하고 drift, latency, error, prediction distribution, 실제 결과를 모니터링합니다. 모델 판단이 직접 안전 제어를 바꾸는 범위는 위험 분석과 승인 절차가 필요합니다.',
      diagram: 'PLC / sensor / vision\n   ↓ gateway · buffer · schema · time sync\nstream/storage → features → model serving\n   ↓                     ↓\ntrace/audit ← dashboard/alert → human decision / MES\n   ↑ actual outcome ─ feedback / retraining',
      answer: '스마트팩토리 AI는 먼저 생산 제어의 안전성과 가용성을 지키도록 OT망과 AI 서비스 경계를 분리합니다. 게이트웨이에서 데이터 품질·시간 동기화·버퍼링을 처리하고, 저장과 feature 생성, 추론, 대시보드, 실제 조치 결과를 추적 가능한 ID로 연결합니다. 모델은 정확도뿐 아니라 지연·결측·드리프트·오탐 비용을 모니터링하고 shadow나 canary로 배포합니다. 네트워크 단절 시 fallback과 사람이 최종 판단하는 절차도 설계합니다.',
      followups: ['edge inference와 cloud inference 선택 기준은?', '센서 결측 시 fallback은?', '모델 버전과 데이터 lineage를 왜 함께 남기나요?'],
      experience: '자동차 공정 리스크 예측 플랫폼의 공정 이상 → 납기 영향 → 대시보드 → 대응 가이드 흐름과 K-water SCADA 운영 관점을 결합해 말하세요. 서로 다른 경험을 하나의 프로젝트처럼 합치지 말고 “프로젝트에서 배운 점”과 “현장 운영 관점”을 구분합니다.',
      quiz: ['스마트팩토리 AI 배포에서 모델 정확도 외에 반드시 볼 운영 항목은?', ['추론 지연·결측·드리프트·fallback', '폰트 종류만', '개발자 수만'], 0, '생산 환경에서는 지연과 장애가 실제 공정에 영향을 주므로 모델 성능과 시스템 신뢰성을 함께 관리해야 합니다.']
    },
    {
      id: 'anomaly-response', cat: 'ai', title: '이상 탐지와 장애 대응의 차이를 설명해 보세요.',
      overview: '이상 탐지는 정상 패턴과 다른 신호를 찾는 단계이고, 장애 대응은 영향 평가·원인 가설·검증·완화·복구·재발 방지까지 포함하는 운영 과정입니다.',
      principle: '이상 점수만으로 원인을 확정하면 안 됩니다. 변화점, 계절성, 배포·정비 이벤트, 다중 센서 상관을 함께 봅니다. 알림은 severity와 confidence, 영향 범위, runbook을 연결하고 중복 억제·상관분석으로 경보 폭주를 줄입니다. 탐지 품질은 event 단위 precision/recall과 MTTD, 대응은 MTTA/MTTR와 재발률을 봅니다.',
      diagram: 'signal deviation → detect → correlate → impact scope\n → hypothesis → safe test → contain / failover\n → recover → verify → timeline / RCA / prevention',
      answer: '이상 탐지는 정상과 다른 신호를 찾는 것이지 원인 확정이나 복구 자체는 아닙니다. 운영 대응에서는 여러 알림을 시간·장비·서비스 의존성으로 묶어 영향 범위를 정하고, 정상 기준선과 최근 변경을 확인해 가설을 세웁니다. 안전한 검증 후 우회나 격리로 영향을 줄이고, 복구 뒤 서비스 지표를 확인한 다음 타임라인과 재발 방지를 남깁니다. 모델은 오탐·미탐 비용과 MTTD까지 평가합니다.',
      followups: ['정적 임계치와 동적 기준선의 장단점은?', '경보 상관분석은 어떻게 하나요?', '복구 완료를 무엇으로 판단하나요?'],
      experience: 'K-water SCADA/NAC·네트워크 장애 진단과 해군 망 운영을 STAR보다 “관측→가설→검증→조치→재발 방지” 순서로 답하세요. TelcoNet Sentinel의 반복 장애 주입은 탐지 시간을 계측한 별도 랩 경험으로 구분합니다.',
      quiz: ['이상 점수가 높다는 사실만으로 바로 단정할 수 있는 것은?', ['고장의 정확한 원인', '정상 패턴과 다를 가능성', '반드시 공격임'], 1, '이상 탐지는 차이를 표시할 뿐 원인과 공격 여부는 추가 상관분석과 증거가 필요합니다.']
    },
    {
      id: 'c-memory', cat: 'sw', title: 'C의 포인터와 메모리 오류를 설명해 보세요.',
      overview: '포인터는 메모리 주소를 값으로 다루는 도구입니다. 강력하지만 수명·경계·소유권을 개발자가 관리해야 해 메모리 안전 취약점이 생길 수 있습니다.',
      principle: '스택 객체의 주소를 함수 반환 후 사용하면 dangling pointer가 되고, 해제 후 접근은 use-after-free, 두 번 해제는 double free, 범위 밖 쓰기는 buffer overflow입니다. 정수 overflow가 할당 크기 계산을 작게 만들 수도 있습니다. 길이 검증, 안전한 API, 단일 소유권 규칙, 컴파일러 경고와 ASan/UBSan, fuzzing, 보호 기법을 계층적으로 사용합니다.',
      diagram: 'stack: [local buffer] ← lifetime ends on return\nheap:  malloc → owned pointer → free → invalid\n\ninput length ─ validate ─→ copy within capacity\n             └ no check → adjacent memory overwritten',
      answer: 'C 포인터는 메모리 주소를 직접 다뤄 저수준 제어가 가능하지만 객체 수명과 경계, 소유권을 개발자가 책임집니다. 범위 밖 쓰기는 인접 메모리를 덮고, free 후 사용이나 이중 해제는 비정상 동작과 취약점으로 이어질 수 있습니다. 그래서 길이와 정수 연산을 검증하고 소유권 규칙을 명확히 하며, 컴파일 경고·정적 분석·AddressSanitizer·퍼징을 CI에서 함께 사용합니다. NX·ASLR·canary는 피해 완화이지 버그 제거는 아닙니다.',
      followups: ['stack과 heap의 수명 차이는?', 'undefined behavior가 위험한 이유는?', 'ASLR과 stack canary의 한계는?'],
      experience: 'Firm-Sentry에서 ELF의 NX·PIE·RELRO·canary를 확인하고 AFL++ 실습을 구성한 공개 포트폴리오 경험을 연결하세요. 보호 옵션이 취약점 자체를 없애지 않는다는 점까지 말하면 좋습니다.',
      quiz: ['free(ptr) 직후 ptr이 자동으로 NULL이 되나요?', ['항상 된다', '되지 않는다', 'Linux에서만 된다'], 1, 'free는 할당을 해제할 뿐 변수 값을 자동 변경하지 않습니다. dangling pointer 사용을 막도록 소유권과 상태를 관리해야 합니다.']
    },
    {
      id: 'sw-testing', cat: 'sw', title: '단위·통합·E2E 테스트와 테스트 더블을 설명해 보세요.',
      overview: '테스트 수준은 범위와 속도, 신뢰도의 균형입니다. 많은 빠른 단위 테스트와 필요한 통합·E2E 테스트를 조합해 변경 위험을 낮춥니다.',
      principle: '단위 테스트는 작은 로직을 격리해 빠르게 검증하고, 통합 테스트는 DB·메시지·프레임워크 경계를 확인하며, E2E는 사용자 흐름을 실제 구성에 가깝게 검증합니다. mock은 상호작용, stub은 준비된 응답, fake는 단순 동작 구현입니다. 구현 세부에 과도하게 결합한 mock은 리팩터링을 방해합니다.',
      diagram: 'many: unit tests      fast / isolated\n some: integration     DB, framework, contract\n few:  E2E             critical user journeys\n\nCI: build → static checks → unit → integration → deploy gate',
      answer: '단위 테스트는 작은 규칙을 빠르고 결정적으로 검증하고, 통합 테스트는 DB나 프레임워크·외부 계약의 연결을 확인하며, E2E는 핵심 사용자 흐름을 전체 시스템에서 검증합니다. 모든 것을 E2E로 만들면 느리고 원인 파악이 어려워 계층을 조합합니다. 테스트 더블은 제어하기 어려운 경계를 대체하되, 구현 호출 횟수보다 관찰 가능한 결과와 계약을 우선 검증합니다. CI에서는 빠른 실패부터 배치하고 핵심 배포 경로에 gate를 둡니다.',
      followups: ['contract test가 필요한 경우는?', 'flaky test를 방치하면 안 되는 이유는?', '커버리지 100%가 품질 100%가 아닌 이유는?'],
      experience: 'ConsentLedger의 공개 포트폴리오에는 단위 119개와 통합 26개가 명시돼 있습니다. 숫자보다 어떤 위험을 각 계층에서 검증했는지, 본인이 작성·개선한 범위를 설명하세요.',
      quiz: ['외부 결제 API와의 요청·응답 형식 호환성을 빠르게 검증하기 적합한 것은?', ['계약 테스트', 'UI 색상 테스트만', '무조건 수동 테스트'], 0, 'consumer/provider 간 계약을 자동 검증하면 전체 E2E보다 빠르게 호환성 깨짐을 발견할 수 있습니다.']
    },
    {
      id: 'design-observability', cat: 'sw', title: '좋은 소프트웨어 설계와 관측 가능성을 설명해 보세요.',
      overview: '운영 가능한 설계는 정상 경로뿐 아니라 실패를 격리하고, 상태를 관측하며, 안전하게 복구할 수 있어야 합니다.',
      principle: '높은 응집도와 낮은 결합도로 변경 경계를 만들고, timeout·retry·circuit breaker·bulkhead를 실패 특성에 맞게 적용합니다. retry는 멱등성, backoff, jitter, 상한이 필요합니다. 로그는 사건, metric은 추세와 경보, trace는 분산 요청 경로에 강합니다. correlation ID와 버전·주체·결과를 남겨 원인 분석과 감사를 돕습니다.',
      diagram: 'request [correlation-id]\n  → service A ─trace span→ service B\n     │ metric: latency/error/saturation\n     └ log: event + context + outcome\n\nfailure → timeout → bounded retry → circuit open / fallback',
      answer: '좋은 설계는 변경 이유가 다른 책임을 분리하고 인터페이스로 결합을 낮춰 테스트와 교체가 쉬워야 합니다. 운영 측면에서는 실패를 정상 시나리오로 보고 timeout, 제한된 재시도, circuit breaker와 격리를 적용합니다. 이때 재시도는 멱등성과 backoff가 없으면 장애를 증폭할 수 있습니다. 로그·메트릭·트레이스를 correlation ID로 연결해 무슨 요청이 어디서 얼마나 느렸고 왜 실패했는지 재구성할 수 있게 합니다.',
      followups: ['retry storm은 어떻게 방지하나요?', 'SLA·SLO·SLI의 차이는?', '로그에 개인정보를 남기지 않으려면?'],
      experience: 'Agent Runtime Security Lab의 intent와 runtime observation 상관분석, OCSF 감사 증거를 관측 가능성 사례로 연결하세요. 해군/K-water 경험은 변경 통제와 장애 타임라인의 중요성을 현장 관점으로 보완합니다.',
      quiz: ['실패한 요청을 무제한 즉시 재시도할 때 생길 수 있는 문제는?', ['하위 시스템 부하를 키워 장애를 증폭', '항상 가용성이 100%가 됨', '데이터가 자동 정규화됨'], 0, '재시도는 backoff·jitter·횟수 제한과 멱등성, 전체 지연 예산이 없으면 retry storm을 만들 수 있습니다.']
    },
    {
      id: 'portfolio-bridge', cat: 'security', title: '프로젝트 경험을 보안 설계 질문에 어떻게 연결하겠습니까?',
      overview: '면접관은 프로젝트 이름보다 문제, 위협, 선택, 검증, 한계를 듣고 싶어 합니다. 서로 다른 프로젝트를 하나의 경험처럼 합치지 않고 공통 설계 원칙을 뽑아냅니다.',
      principle: 'NodeConnection은 위변조 방지와 분산 원장, ConsentLedger는 동의·전송과 해시 체인 감사, Agent Runtime Security Lab은 에이전트 의도와 런타임 행동의 차이를 정책·관측으로 통제한 문제입니다. 공통축은 신뢰 경계, 최소 권한, 변경 증거, 검증 가능성입니다. 블록체인·해시·OPA 같은 기술명보다 어떤 공격·오류를 어떤 통제로 줄였는지 설명합니다.',
      diagram: 'Problem → asset / threat / trust boundary\n       → control choice + rejected alternative\n       → test / evidence / observed limit\n       → residual risk + next improvement\n\nOne project per claim; shared lesson after.',
      answer: '저는 프로젝트를 기술 나열보다 신뢰 경계를 설계한 경험으로 설명하겠습니다. NodeConnection에서는 등기 데이터의 위변조 방지, ConsentLedger에서는 동의 변경과 감사 로그의 무결성, Agent Runtime Security Lab에서는 에이전트가 허가된 의도와 다른 행동을 하는 위험을 다뤘습니다. 각 프로젝트마다 보호 자산과 위협을 먼저 정의하고 접근통제·검증·감사 증거를 선택했으며, 남는 위험과 로컬 실험 한계도 함께 말하겠습니다.',
      followups: ['해시 체인이 관리자 전체 재작성을 막을 수 있나요?', '정책 엔진 장애 시 기본 동작은?', '블록체인이 필요 없는 경우는?'],
      experience: '이 문항 자체가 경험 브릿지입니다. 팀 프로젝트인 NodeConnection과 제조 AI는 개인 기여를 분리하고, 개인 프로젝트도 README의 구현 여부와 실제 재현 결과를 기준으로 답하세요.',
      quiz: ['보안 프로젝트 설명의 가장 설득력 있는 순서는?', ['기술명 나열만', '자산·위협→통제 선택→검증→한계', '별 개수→화면 색상→유행어'], 1, '보안 설계는 무엇을 왜 보호했고 통제가 실제로 작동했는지, 무엇이 남았는지를 보여줘야 합니다.']
    },
    {
      id: 'incident-answer', cat: 'security', title: '현장 장애·보안 사고 경험을 구조적으로 답해 보세요.',
      overview: '사고 답변은 영웅담보다 통제된 판단 과정이 중요합니다. 당시 권한과 사실, 팀의 결정, 본인의 행동을 구분하고 복구 확인과 재발 방지까지 닫습니다.',
      principle: '상황과 영향, 즉시 안전조치, 시간순 증거, 가설과 반증, 변경 승인, 복구 검증, 사후 개선 순으로 말합니다. 보안 사고 가능성이 있으면 증거 보존과 최소 변경을 고려합니다. 가용성 때문에 우회가 필요해도 예외 범위·만료·감사를 둡니다. 모르는 원인은 모른다고 하고 추가 확인 계획을 말합니다.',
      diagram: 'S: symptom + business/mission impact\nT: role + constraint + safety priority\nA: observe → hypothesize → verify → controlled change\nR: service metric restored + evidence\nL: RCA / runbook / monitor / prevention',
      answer: '현장 장애 질문에는 먼저 증상과 영향 범위, 당시 제 역할과 권한을 분명히 하겠습니다. 이후 로그·연결 상태·정책 변경 이력을 시간순으로 모아 네트워크, 인증, 서비스 가설을 세우고 영향이 작은 검증부터 수행했다고 설명하겠습니다. 조치는 승인된 범위에서 적용하고 서비스 지표와 사용자 관점으로 복구를 확인합니다. 마지막으로 원인과 재발 방지, 남은 불확실성을 구분해 말하겠습니다.',
      followups: ['보안 정책 우회가 복구에 필요하면 어떻게 하나요?', '원인을 끝내 찾지 못하면?', '팀과 의견이 달랐을 때 무엇을 기준으로 결정했나요?'],
      experience: 'K-water SCADA/NAC·네트워크 장애 진단과 해군 망 운영 중 가장 사실이 분명한 한 사례만 선택하세요. 민감한 망 구성·주소·취약점은 공개하지 않고, 팀 성과를 개인 성과로 바꾸지 않습니다.',
      quiz: ['장애 복구 확인으로 가장 충분한 것은?', ['프로세스가 켜졌다는 사실만', '원래 실패했던 사용자 흐름과 핵심 지표가 정상임을 확인', '로그를 삭제함'], 1, '프로세스 상태만으로 서비스 복구를 단정할 수 없습니다. 실제 실패 경로와 건강 지표를 함께 확인해야 합니다.']
    }
  ];

  var STORAGE_KEY = 'hyosung-interview-progress-v1';
  var state = { category: 'all', query: '', done: loadDone() };

  function loadDone() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function saveDone() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.done)); }
    catch (e) { /* Browsing still works when storage is unavailable. */ }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
    });
  }

  function categoryLabel(key) {
    var found = CATEGORIES.find(function (item) { return item[0] === key; });
    return found ? found[1] : key;
  }

  function renderFilters() {
    var root = document.getElementById('category-filters');
    root.innerHTML = CATEGORIES.map(function (item) {
      var count = item[0] === 'all' ? TOPICS.length : TOPICS.filter(function (topic) { return topic.cat === item[0]; }).length;
      return '<button class="iv-filter' + (state.category === item[0] ? ' is-active' : '') + '" type="button" data-category="' + item[0] + '">' + item[1] + ' · ' + count + '</button>';
    }).join('');
  }

  function referencesHtml(topic) {
    return (SOURCES[topic.cat] || []).map(function (source) {
      return '<a href="' + source[1] + '" target="_blank" rel="noopener">' + escapeHtml(source[0]) + ' ↗</a>';
    }).join('');
  }

  function topicHtml(topic, index) {
    var done = !!state.done[topic.id];
    var quizButtons = topic.quiz[1].map(function (option, optionIndex) {
      return '<button class="iv-quiz-option" type="button" data-answer="' + optionIndex + '">' + escapeHtml(option) + '</button>';
    }).join('');
    return '<details class="iv-question' + (done ? ' is-done' : '') + '" id="q-' + topic.id + '" data-category="' + topic.cat + '">' +
      '<summary><span class="iv-number">' + String(index + 1).padStart(2, '0') + '</span>' +
      '<span class="iv-title-wrap"><span>' + escapeHtml(categoryLabel(topic.cat)) + '</span><h3>' + escapeHtml(topic.title) + '</h3></span>' +
      '<span class="iv-summary-actions"><button class="iv-check" type="button" aria-label="학습 완료 체크" aria-pressed="' + done + '" data-topic="' + topic.id + '"></button><i class="iv-chevron" aria-hidden="true">⌄</i></span></summary>' +
      '<div class="iv-question-body"><p class="iv-overview">' + escapeHtml(topic.overview) + '</p><div class="iv-grid">' +
      block('핵심 원리', '<p>' + escapeHtml(topic.principle) + '</p>') +
      block('텍스트 다이어그램', '<pre class="iv-diagram">' + escapeHtml(topic.diagram) + '</pre>') +
      block('30~60초 면접 답변', '<p class="iv-answer">' + escapeHtml(topic.answer) + '</p>', 'iv-wide') +
      block('예상 꼬리질문', '<ul>' + topic.followups.map(function (q) { return '<li>' + escapeHtml(q) + '</li>'; }).join('') + '</ul>') +
      block('경험 연결', '<p>' + escapeHtml(topic.experience) + '</p>', 'iv-experience-link') +
      block('회상 퀴즈', '<p><strong>' + escapeHtml(topic.quiz[0]) + '</strong></p><div class="iv-quiz-options" data-correct="' + topic.quiz[2] + '">' + quizButtons + '</div><p class="iv-quiz-explanation" hidden>' + escapeHtml(topic.quiz[3]) + '</p>', 'iv-wide') +
      '<div class="iv-block iv-wide"><h4><i></i>출처·더 읽기</h4><div class="iv-references">' + referencesHtml(topic) + '</div></div>' +
      '</div></div></details>';
  }

  function block(title, content, extraClass) {
    return '<section class="iv-block ' + (extraClass || '') + '"><h4><i></i>' + title + '</h4>' + content + '</section>';
  }

  function filteredTopics() {
    var query = state.query.trim().toLocaleLowerCase('ko-KR');
    return TOPICS.filter(function (topic) {
      var categoryMatch = state.category === 'all' || topic.cat === state.category;
      var haystack = [topic.title, topic.overview, topic.principle, topic.answer, topic.experience, topic.followups.join(' ')].join(' ').toLocaleLowerCase('ko-KR');
      return categoryMatch && (!query || haystack.indexOf(query) !== -1);
    });
  }

  function renderTopics() {
    var list = document.getElementById('question-list');
    var results = filteredTopics();
    list.innerHTML = results.map(function (topic) { return topicHtml(topic, TOPICS.indexOf(topic)); }).join('');
    document.getElementById('empty-state').hidden = results.length !== 0;
    document.getElementById('result-summary').textContent = results.length === TOPICS.length ? '전체 ' + TOPICS.length + '개 문항' : results.length + '개 문항 표시 중';
    updateProgress();
  }

  function updateProgress() {
    var done = TOPICS.filter(function (topic) { return !!state.done[topic.id]; }).length;
    document.getElementById('topic-count').textContent = TOPICS.length;
    document.getElementById('done-count').textContent = done;
    document.getElementById('progress-rate').textContent = Math.round(done / TOPICS.length * 100) + '%';
  }

  function setCategory(category, shouldScroll) {
    state.category = category;
    renderFilters();
    renderTopics();
    if (shouldScroll) document.getElementById('study').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('click', function (event) {
    var filter = event.target.closest('[data-category]');
    if (filter) { setCategory(filter.dataset.category, false); return; }

    var route = event.target.closest('[data-route]');
    if (route) { setCategory(route.dataset.route, true); return; }

    var check = event.target.closest('.iv-check');
    if (check) {
      event.preventDefault();
      event.stopPropagation();
      var id = check.dataset.topic;
      state.done[id] = !state.done[id];
      if (!state.done[id]) delete state.done[id];
      saveDone();
      check.setAttribute('aria-pressed', String(!!state.done[id]));
      check.closest('.iv-question').classList.toggle('is-done', !!state.done[id]);
      updateProgress();
      return;
    }

    var option = event.target.closest('.iv-quiz-option');
    if (option) {
      var options = option.closest('.iv-quiz-options');
      var correct = Number(options.dataset.correct);
      Array.from(options.children).forEach(function (button, index) {
        button.classList.remove('is-correct', 'is-wrong');
        if (index === correct) button.classList.add('is-correct');
      });
      if (Number(option.dataset.answer) !== correct) option.classList.add('is-wrong');
      options.nextElementSibling.hidden = false;
    }
  });

  document.getElementById('question-search').addEventListener('input', function (event) {
    state.query = event.target.value;
    renderTopics();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
      event.preventDefault();
      document.getElementById('question-search').focus();
    }
  });

  document.getElementById('random-question').addEventListener('click', function () {
    var topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    state.category = 'all';
    state.query = '';
    document.getElementById('question-search').value = '';
    renderFilters();
    renderTopics();
    var target = document.getElementById('q-' + topic.id);
    target.open = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('reset-progress').addEventListener('click', function () {
    if (!window.confirm('저장된 학습 체크를 모두 초기화할까요?')) return;
    state.done = {};
    saveDone();
    renderTopics();
  });

  renderFilters();
  renderTopics();
})();

