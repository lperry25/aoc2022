import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/day6';

describe('Day6', () => {
  const solve = async (input: string) => {
    const { req, res } = createMocks({
      method: 'POST',
      // @ts-ignore
      body: input,
    });
    return await handler(req, res);
  };

  it('passes the first test case', async () => {
    const response = await solve('mjqjpqmgbljsphdztnvjfqwrcgsmlb');
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(7);
    expect(result.result2).toBe(19);
  });

  it('passes the second test case', async () => {
    const response = await solve('bvwbjplbgvbhsrlpgdmjqwftvncz');
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(5);
    expect(result.result2).toBe(23);
  });

  it('passes the third test case', async () => {
    const response = await solve('nppdvjthqldpwncqszvftbrmjlhg');
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(6);
    expect(result.result2).toBe(23);
  });

  it('passes the fourth test case', async () => {
    const response = await solve('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg');
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(10);
    expect(result.result2).toBe(29);
  });

  it('passes the fifth test case', async () => {
    const response = await solve('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw');
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(11);
    expect(result.result2).toBe(26);
  });

  it('passes with my input', async () => {
    const response = await solve(
      'djhjvjggdzznllvvrvggscgscsrrffgvfvllfclcrchhwzhzqqlhqhffsdsmmcffnggcttdpttwpwttjvtjvtvqqctcwcmcsswvwzzlnzlnnvbnbdnngmmhchrcrqqhbhllbtllmppgjjtvjvdjvvpcpjcjjfrfzfzzdvzdvvswvvjzzbpzbzzddbndbbgjbjjvpjpjtjqtjqjcjmcjjrtjrjrqqvtvpvwpprhphrhdrddpdhhfsspddqnqwnntrtnrrthrhtrtwtdttmmnvmnmppswsqwqjqwqbqrqbqdbqdqgdqgqtgqqgzzhpzzwswvwmvwwvvrzznwzzbsbhbfhhvcvwvvrzrgzzfhzhhlthlhqhgqgttlmljmlmqqjddtqtctbblplddnqnzqnnzrzjrrqwrqqcfffbdfffspsqswstspsvppqmppdmppdvvfrfddqhqzqddtjddfqfrfllnjjcnnjzjmzmtmddbvdvzvbzzcjzzffdbdbsswshhrwrrfggpccszzzgdgvvlflwwdbbhqhffngffdfdmdgdhdmhdmdsspssctstdtdmdhhzvvcbbrqqmrmwwjmjqjmqjmjjjrmrmlmmbppmgpgttmptpspmmrttcddtjjspsfsqqbhbbzzgbzzznwzzlddmtdmdgmmlnljlvjjtgjjggmmnnvqnqzzfhzhttvbbprpmpmrmlrmllwmlwmlwwsjjlffbgfggqmggqgvglvvrpvrpvpnpphmhnmhhbbqjbbrrvfrfwflldffzwzccscqsqppctctddqbbmggmccdbdvbdvvpdpdbdsdjsjbbwpwcpcbcbmmzdmmvtvqvpvphhlblwwfmwmvvdhdtdwwlblglhhvfvwwqggrnrttpddtvvwqvqmqhhwnnghhbpbvbnvvdqqrqdqwqppmwpwhppnmnjmnjmjttvhhcgchcssrlrwllpdpndpdtptzppqqpvvtffcwffjppvnnjvvjnnwcwnnhlhjhsjsnjjzfjfsfhsssvttvfvsvpspppwswmswwqmwwzvwzzvtzvvwddqqzhhqpqjjwrwlrrbcbvvqllqjllvzvgvmvhmmsppwvpwphhjnndjjtpjtthzzvrrcwcrczzmqmsssvtstqtrrgtrtvtwtccbwcwrwbbdbgbmmcsmcssvjsjqqsnqqtvvbgbfbdffhjffvnnzpplqppzzfwfrfnfcncqccgjjcffhshrhgrhghvhphccqtcqtccjzccdnncggftgttrppnpptlltztqtjqqvfvqvdvmvmjjgqqrqgrqqcggdvvpcvcjvjnnrjjmbmlbmmqvmqmfmwmpwwnhwdtmvhqfwlbpzjplfhfntjgmvqmmjqpbngpvjvpgzpqwjjwhvjwwplrtjhzmzqmdrppgbrspmctlggmflbjzzfcvvdqlrtvqvwhcpjnmlvfgwrwwtblpqstddnqntnmwsbgjfrbdrlnvqdrnttshjmvpmncmggfdbnndwzmswmdvhmmwtgpfglrzzhwcsgvhnnrrhmnhftvvqfdfrsphzbslgscmwsnrwbvqphhswvpvsbbstvnndclhfhdctlvwrmdgzfcfmjmznqvvqrddmdlqznvcsqsgnpcqqhbdwqntcnqljstqvrzhgvzqdltpwmnpvjmqrpjsfhqvhchjnwjnqpdqbdjqdpqsqhbwwmhfthzbrsjnhncpbjrhgqlzmrzlnvrrfvlrmflcqfmqjzjwscrflgzwtbchfrnvsrrtncvhjbnnmlmmfdjcbmbsmgdtwzwcwnthfbsnrgdfwqjncqsdmfnfqgtcwrhjprlnhvrnpmnnhlwstvqjrsprqhjzszzgfznmgwjqglvfrrwpdbptdrnbbwbzbcbhbtcchmfsgmvnmrbdqhqgmvtfmvpgvjzjpgjbdhcfrfhprgdzrprccnhbmzdfjsgldlgpgdrfhbhtmhdttdsbndgbdfccqhhwhqfmlsfhsbbbmdncrwzcnrdvcmhllfwtrgjpgngzwptnqtggtcjwrptffmsrgdpctsdjtpssngsdqwfsbhdbcqvbdrzlhzlsbbzhqthzhcwsftlhrmhgpfzljgcphjjvhpqjzsfnrztwrhlnlbmgcgmstrbbwclpvdtdpclzlhmmpmmpmppnwjglhwppprlbzbvwqwmpgtvvpgdthnwbtblwpwgvmbcbjwjbczlcmzfwzbqvzsvgcmspvrsblldscqlgghdwzbvhhvgcfwgnqwlngclbjfwrpwtdjvqmzwwjztwdjplhzpzfslbbvfdsnpggwcttzwdlzgqgmrnpnclhrlngtwcwblzdjmpgqvzsvsdmzdwlgcdlccnnlrcvtrvspcsmgmzzvwnlzwtznwtqtdjcnhwrqhqrmvqqhrpdtnsmfrlcgpjcnddsqzcppgrnhvwsdbjvvtmvbjdncpdnmzfswmtvzfbdpqfjvwvqlhptnpdfdnlwfrgstpvvmhsqfgggdrsfgldfzbcjzhqzvfwmzccwjrslhjwlbmrpqgzdfnfbhsmdpzwtqnqldtqvshvlvmlnnmqrqbpwvnhqhtcbfclhrcqlqzhsqplsnbczvrbzqwlfwjdtmstzdbswtrvlpzzlrfvgdmldbwcttztrvsgzjwhhpcrvtgzfzppdlrdwswbnjfqqpqfbcqlzdmjsgjtzmvhdzspwlqpdjnccmbtdhnnhfvwqclbzzgglfgmvvgrccdsbwfmpvqwqrhmdzfhhhgbgjgwmnzmnggfrpspchvzpcmcpsbzgldmgqjqqdcjpwwncwrwjbhgzdbbcmbzbbtvprsjrhfwgsppdrrlzvnmtmwrmmrhtlndvsvjvgqmmttbbnpdhnjhwgrvlrdtpbrtwpwvvpslcqnvnrlhpvgdwnrzjmhwmgvpndtrjlzqpfzfbrsgbzjjqcfgsfwchblzstdflblngtzbrzrrvsczqvfhjjdlffrghgqvqfdtstqlnzllsrnnrtvrzdphbhdfpmhlfncqbdtzjqqcfbzpvgzdcsvvbfdvqrfrncbrwmpdmhnlqdscwnvldzblpzfqcvnbzmmtbmwjbczsjvzmfthfpvjcpwftqcbgjwflfrbrggwnvwndtncljfrdfwqwhfbctpjghfvnjnntnrgbfbmhplgmpfvmgvfqjslgnnrnlgztlstpcjwtlhmwlljcfmptfwsphnlsrjwmgtghgqmsvwvqsmblwpdftbrwjcdlzjmjblghszznqhsnqrcmtccgdwrrlsmwswvrjltqmwsdwvpnzltllhrsdvmrntdhtwwbgrqmrffnqbqrczvzchbgmzwtjtfzwntsnlbwbgrlvqjsqmdnwjqlwrdpnfpggzrjvtrhqdbmmbtfmmblgwtrqccqbjnljqflhgtphvrgrgghgrpbgfgdztsmfwrfflsqmrwbfjwsmpfrnbqjwnwdqwcwzpwbsmngjwfmbwdmnprdjnjbmqgfcbvtcvcthpmnmvvzdzgqqbhtjqfcdvhfzwqgfsbtvnwbzpmmtswfntjjppsswgbfrjbrstltdgbmclmbfvlslghbhnqqbdlzgtctgsfnwvbpzbvnwfbjmbfqcpqqvgrzwcbrwzdbdsjsslcjlmtprntpsdmqldzwqlqztwqtqfqzmrnzbtpqlfnsdwfdgggfvmqmrdqmnffnzcwfzsrqfpvrmsfsrbnpbhnqvdglvglllpggpmwmngrhzwgpdlzrbsvjtqmshhnlzwwftdtqwrqwgbbnczqcwmsvcljqlscftwflhwwhgnqwztfchdzsllrzbhbqwcfztjnqtdmsfnlzlcwzfmtlcgwclzfhhldgrnfjvzthzqzmzvwcrnhpdcwswpddsbwtznwlcwsnfqnqwnntngplwnfgwrcnpvgffwrcrszzdbfvzjmrmlrjwcvdvbglgncjwcnnpdfnwsrzsvzgnjrlqmwhvtdgmpbqmjthmhhmzjhpvnbvrqnlspdbcgshwlnvwpvrbcmvbvcsdmgwtmsthqtcfmllsfwvqcrbmdgqtzjwrg',
    );
    // @ts-ignore
    const result = JSON.parse(response._getData());
    expect(result.result1).toBe(1356);
    expect(result.result2).toBe(2564);
  });
});
