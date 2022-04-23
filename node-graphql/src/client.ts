import axios from "axios";

const execute = async function(data: {query: string, variables?: any}) {
  try {
    const response = await axios({
      url: 'http://localhost:4000',
      method: 'post',
      data
    });
    const result = response.data;
    console.log(JSON.stringify(result, undefined, ' '))
  } catch (error) {
    console.error(error.response.data)
  }
};

(async function() {
  await execute({
  query: `
    mutation($channel: ChannelInput!) {
      saveChannel (channel: $channel){
        idChannel
        name
      }
    }
  `,
  variables: {
    channel: {
      idChannel: 3,
      name: "Channel added"
    }
  }

})
  await execute({query: `
    query{
      channels {
        idChannel
        name
        playlists{
          description
          videos{
            title
          }
        }
      }
    }
  `})

})();