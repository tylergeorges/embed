import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { graphql } from '../../../graphql';

const guildQuery = graphql(/* GraphQL */ `
  query Guild {
    guild(id: "585454996800405509") {
      id
    }
  }
`);

const GuildChannel: NextPage = () => {
  const router = useRouter();
  const { guild, channel } = router.query;
  const [result] = useQuery({ query: guildQuery });

  console.log(result);

  return (
    <div>
      Channel - {guild} - {channel}
    </div>
  );
};

export default GuildChannel;
